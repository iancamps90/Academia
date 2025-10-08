import { Request, Response } from 'express';
import { stripe } from '../utils/stripe';
import { prisma } from '../utils/prisma';
import { AuthRequest } from '../middleware/auth';

export const createCheckoutSession = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user!.id;

    // Verificar que el curso existe
    const course = await prisma.course.findUnique({
      where: { id: parseInt(id) }
    });

    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Verificar que el usuario no haya comprado ya este curso
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_courseId: {
          userId,
          courseId: parseInt(id)
        }
      }
    });

    if (existingPurchase) {
      return res.status(400).json({ message: 'Ya has comprado este curso' });
    }

    // Crear sesión de Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: course.title,
              description: course.description,
              images: [course.image],
            },
            unit_amount: Math.round(course.price * 100), // Convertir a centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/cancel`,
      metadata: {
        userId: userId.toString(),
        courseId: id,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Error al crear sesión de checkout:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getUserCourses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const purchases = await prisma.purchase.findMany({
      where: { userId },
      include: {
        course: true
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(purchases);
  } catch (error) {
    console.error('Error al obtener cursos del usuario:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response) => {
  try {
    const sig = req.headers['stripe-signature'] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!endpointSecret) {
      console.error('STRIPE_WEBHOOK_SECRET no está configurado');
      return res.status(500).json({ message: 'Error de configuración' });
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
      console.error('Error de verificación de webhook:', err.message);
      return res.status(400).json({ message: 'Webhook signature verification failed' });
    }

    // Manejar el evento de pago exitoso
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;

      const { userId, courseId } = session.metadata;

      // Crear la compra en la base de datos
      await prisma.purchase.create({
        data: {
          userId: parseInt(userId),
          courseId: parseInt(courseId),
          stripeSessionId: session.id,
        }
      });

      console.log(`Compra completada: Usuario ${userId} compró curso ${courseId}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error en webhook de Stripe:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

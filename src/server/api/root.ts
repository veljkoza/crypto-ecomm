import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { productsRouter } from "./products/router";
import { ordersRouter } from "./orders/router";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  product: productsRouter,
  order: ordersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

import { z } from "zod";

const packageSchema = z.object({
  codigo: z
    .string({ required_error: "solo numeros en el codigo" })
    .nonempty(),
  // codigo_peso: z.number({required_error: 'solo numeros en el peso'}),
  nombre_paquete: z
    .string({ required_error: "escribir el nombre del paquete" })
    .nonempty(),
});

export default packageSchema;

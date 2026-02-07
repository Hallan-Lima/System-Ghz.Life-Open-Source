/**
 * @author HallTech AI
 */
export type ResponseEnvelope<T> = {
  success: boolean;
  data: T | null;
  message: string;
  errors: string[];
};

export const responseEnvelope = <T>(payload: ResponseEnvelope<T>): ResponseEnvelope<T> => payload;

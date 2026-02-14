export interface User {
	id: string;
	email: string;
	name: string | null; // Based on 'String?' in Prisma schema
}

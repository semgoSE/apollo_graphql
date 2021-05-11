import { PrismaClient } from '@prisma/client'
import User from './data/User'
const prisma = new PrismaClient()

export default async function set_vacation(id:number, vacation: boolean) {
    let user = await prisma.user.update({ data: { vacation }, where: { id } });
    return user;
}
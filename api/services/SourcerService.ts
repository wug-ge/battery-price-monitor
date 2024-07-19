import { getDataSource } from "../data-source";
import { Sourcer } from "../models/Sourcer";

export async function getSourcer(name: string) {
  const sourcerRepository = getDataSource().getRepository(Sourcer);
  let sourcer = await sourcerRepository.findOne({ where: { name } });
  if (!sourcer) {
    sourcer = await createSourcer(name);
  }
  return sourcer
}

async function createSourcer(name: string) {
  const sourcerRepository = getDataSource().getRepository(Sourcer);
  const sourcer = new Sourcer();
  sourcer.name = name
  return await sourcerRepository.save(sourcer);
} 
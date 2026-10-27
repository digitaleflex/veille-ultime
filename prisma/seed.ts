import { PrismaClient, SourceKind } from "@prisma/client";
import { sourceCatalog } from "../src/config/source-catalog";

const prisma = new PrismaClient();

async function main() {
  for (const definition of sourceCatalog) {
    await prisma.source.upsert({
      where: { url: definition.url },
      create: {
        name: definition.name,
        url: definition.url,
        kind: definition.kind as SourceKind,
        parserKey: definition.parserKey,
        description: definition.description,
        topics: definition.topics,
        language: definition.language,
        trustLevel: definition.trustLevel,
        isOfficial: definition.isOfficial,
        fetchIntervalMinutes: definition.fetchIntervalMinutes,
        // Les sources restent désactivées tant qu'un collecteur compatible n'est pas implémenté.
        enabled: false,
      },
      update: {
        name: definition.name,
        kind: definition.kind as SourceKind,
        parserKey: definition.parserKey,
        description: definition.description,
        topics: definition.topics,
        language: definition.language,
        trustLevel: definition.trustLevel,
        isOfficial: definition.isOfficial,
        fetchIntervalMinutes: definition.fetchIntervalMinutes,
        // Ne pas écraser enabled/état opérationnel d'une source existante.
      },
    });
  }
  console.log("Catalogue de sources synchronisé.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());

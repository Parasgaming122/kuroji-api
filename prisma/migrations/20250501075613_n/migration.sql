-- DropForeignKey
ALTER TABLE "_CharacterVoiceActors" DROP CONSTRAINT "_CharacterVoiceActors_A_fkey";

-- AddForeignKey
ALTER TABLE "_CharacterVoiceActors" ADD CONSTRAINT "_CharacterVoiceActors_A_fkey" FOREIGN KEY ("A") REFERENCES "AnilistCharacterEdge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

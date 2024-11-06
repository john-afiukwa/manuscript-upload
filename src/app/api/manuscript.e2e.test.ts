import { deleteFile, getUserManuscriptsAction, uploadManuscriptAction } from './manuscripts';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Manuscripts API', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('uploadManuscriptAction', () => {
    const goodFile = new File(['dummy content'], 'test.txt', { type: 'text/plain' });
    const badFile = new File(['dummy content'], 'test.txt', { type: 'application/pdf' });
    const fileTitle = 'testFile';

    afterAll(async () => { 
      await deleteFile(fileTitle);
    });

    it('should upload a file and store its reference in Firestore', async () => {


      const downloadUrl = await uploadManuscriptAction(goodFile, fileTitle, 'testUser');

      expect(downloadUrl).toBeDefined();
      expect(downloadUrl).not.toBeInstanceOf(Error);
    });

    it('should handle errors during file upload', async () => {
      const fileTitle = 'testFileErr';
      const expectedErr = new Error('Only plain text files are allowed.');

      await expect(uploadManuscriptAction(badFile, fileTitle, 'testUser')).rejects.toEqual(expectedErr);
    });
  });

  describe('getUserManuscripts', () => {

    afterAll(async () => { 
      const userId = ['testUser1', 'testUser2'];
      const promises = userId.map((id) => getUserManuscriptsAction(id));
      const testUserManuscripts = (await Promise.all(promises)).flat()

      await Promise.all(testUserManuscripts.map((data) => deleteFile(data.title)));
    });

    it('should fetch user manuscripts from Firestore', async () => {
      const userId = 'testUser1';
      const testUserManuscripts = Array.from({ length: 3 }, (_, i) => (new File([`dummy content ${i}`], `test${i}.txt`, { type: 'text/plain' })));
      const testUser2Manuscripts = Array.from({ length: 3 }, (_, i) => (new File([`dummy content ${i}`], `test${i}.txt`, { type: 'text/plain' })));

      await Promise.all(testUserManuscripts.map((file, i) => uploadManuscriptAction(file, `test-${userId + i}`, userId)));
      await Promise.all(testUser2Manuscripts.map((file, i) => uploadManuscriptAction(file, `test-testUser2${i}`, 'testUser2')));


      const result = await getUserManuscriptsAction(userId);

      expect(result).toHaveLength(3);
      expect(result.map(({userId}) => userId)).toEqual(Array(result.length).fill(userId));
    });
  });
});
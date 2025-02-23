import { Router } from 'express';
import { addLanguagesToDb, executeCode ,  getSupportedLanguages, updateLanguage} from '../controllers/executionController';

const router = Router();
console.log('control reaching here-->')
router.get(`/getLangs`, getSupportedLanguages)
router.post(`/executeCode`, executeCode)
router.post(`/addLangs`, addLanguagesToDb)
router.put(`/updateLang`, updateLanguage)
export default router;
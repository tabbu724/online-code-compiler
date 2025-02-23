"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const executionController_1 = require("../controllers/executionController");
const router = (0, express_1.Router)();
console.log('control reaching here-->');
router.get(`/getLangs`, executionController_1.getSupportedLanguages);
router.post(`/executeCode`, executionController_1.executeCode);
router.post(`/addLangs`, executionController_1.addLanguagesToDb);
router.put(`/updateLang`, executionController_1.updateLanguage);
exports.default = router;
//# sourceMappingURL=appRoutes.js.map
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, 'modules', 'auth', 'features');

const fixes = [
    {
        file: 'components/OnboardingSlider.tsx',
        replacements: [
            { regex: /['"]\.\.\/auth\.types['"]/g, to: "'@/modules/auth/domain/auth.types'" },
            { regex: /['"]\.\.\/constants['"]/g, to: "'@/modules/auth/domain/constants'" }
        ]
    },
    {
        file: 'components/RegisterWizard.tsx',
        replacements: [
            { regex: /['"]\.\.\/auth\.types['"]/g, to: "'@/modules/auth/domain/auth.types'" },
            { regex: /['"]\.\.\/constants['"]/g, to: "'@/modules/auth/domain/constants'" }
        ]
    },
    {
        file: 'hooks/useOnboarding.ts',
        replacements: [
            { regex: /['"]\.\.\/auth\.types['"]/g, to: "'@/modules/auth/domain/auth.types'" },
            { regex: /['"]\.\.\/constants['"]/g, to: "'@/modules/auth/domain/constants'" }
        ]
    },
    {
        file: 'hooks/useRegister.ts',
        replacements: [
            { regex: /['"]\.\.\/auth\.types['"]/g, to: "'@/modules/auth/domain/auth.types'" },
            { regex: /['"]\.\.\/constants['"]/g, to: "'@/modules/auth/domain/constants'" }
        ]
    },
    {
        file: 'services/auth.service.ts',
        replacements: [
            { regex: /['"]\.\.\/auth\.types['"]/g, to: "'@/modules/auth/domain/auth.types'" },
            { regex: /['"]\.\.\/constants['"]/g, to: "'@/modules/auth/domain/constants'" }
        ]
    }
];

let changedCount = 0;
fixes.forEach(fix => {
    const filePath = path.join(basePath, fix.file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;
        fix.replacements.forEach(rep => {
            content = content.replace(rep.regex, rep.to);
        });
        if (content !== original) {
            fs.writeFileSync(filePath, content, 'utf8');
            changedCount++;
            console.log('Fixed auth internal path in ' + fix.file);
        }
    }
});
console.log('Processed ' + changedCount + ' files via explicit fixes.');

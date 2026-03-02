import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basePath = path.join(__dirname, 'modules');

const fixes = [
    {
        file: 'ai/features/services/ai.service.ts',
        replacements: [
            { regex: /\.\.\/\.\.\/finance\/services\/finance\.service/g, to: "@/modules/finance/features/services/finance.service" },
            { regex: /\.\.\/\.\.\/tasks\/services\/tasks\.service/g, to: "@/modules/tasks/features/services/tasks.service" },
            { regex: /\.\.\/\.\.\/health\/services\/health\.service/g, to: "@/modules/health/features/services/health.service" },
            { regex: /\.\.\/\.\.\/settings\/services\/settings\.service/g, to: "@/modules/settings/features/services/settings.service" }
        ]
    },
    {
        file: 'auth/features/components/RegisterWizard.tsx',
        replacements: [
            { regex: /\.\.\/\.\.\/auth\/auth\.types/g, to: "@/modules/auth/domain/auth.types" }
        ]
    },
    {
        file: 'dashboard/features/hooks/useDashboard.ts',
        replacements: [
            { regex: /\.\.\/\.\.\/finance\/services\/finance\.service/g, to: "@/modules/finance/features/services/finance.service" },
            { regex: /\.\.\/\.\.\/tasks\/services\/tasks\.service/g, to: "@/modules/tasks/features/services/tasks.service" }
        ]
    },
    {
        file: 'dashboard/features/services/dashboard.service.ts',
        replacements: [
            { regex: /\.\.\/\.\.\/\.\.\/services\/geminiService/g, to: "@/modules/ai/features/services/ai.service" },
            { regex: /\.\.\/\.\.\/finance\/services\/finance\.service/g, to: "@/modules/finance/features/services/finance.service" },
            { regex: /\.\.\/\.\.\/tasks\/services\/tasks\.service/g, to: "@/modules/tasks/features/services/tasks.service" }
        ]
    },
    {
        file: 'finance/features/hooks/useFinance.ts',
        replacements: [
            { regex: /\.\.\/services\/finance\.service/g, to: "@/modules/finance/features/services/finance.service" }
        ]
    },
    {
        file: 'modules/pages/ModulesPage.tsx',
        replacements: [
            { regex: /import ModulesView from ['"]@\/modules\/modules\/features\/components\/ModulesView['"]/g, to: "import ModulesView from '@/modules/modules/features/modules/components/ModulesView'" }
        ]
    },
    {
        file: 'settings/features/components/EditProfileView.tsx',
        replacements: [
            { regex: /\.\.\/\.\.\/auth\/constants/g, to: "@/modules/auth/domain/constants" },
            { regex: /import \{ getUserTraitInterests \} from ['"](.*)['"]/g, to: "import { getUserTraitInterests } from '@/modules/auth/domain/constants'" }
        ]
    },
    {
        file: 'settings/features/components/SettingsMenu.tsx',
        replacements: [
            { regex: /\.\.\/\.\.\/notifications\/hooks\/useNotifications/g, to: "@/modules/notifications/features/hooks/useNotifications" }
        ]
    },
    {
        file: 'settings/features/hooks/useEditProfile.ts',
        replacements: [
            { regex: /\.\.\/\.\.\/auth\/auth\.types/g, to: "@/modules/auth/domain/auth.types" }
        ]
    },
    {
        file: 'settings/pages/MenuOrderingPage.tsx',
        replacements: [
            { regex: /import MenuOrderingView from ['"]@\/modules\/modules\/features\/components\/MenuOrderingView['"]/g, to: "import MenuOrderingView from '@/modules/modules/features/modules/components/MenuOrderingView'" }
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
            console.log('Fixed ' + fix.file);
        }
    }
});
console.log('Processed ' + changedCount + ' files via explicit fixes.');

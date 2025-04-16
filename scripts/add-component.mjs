#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Corrige __dirname no modo ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Captura os argumentos
const [type, rawName] = process.argv.slice(2);

if (!type || !rawName) {
    console.error("Uso: npm run add:<atom|molecule|organism> <component-name>");
    process.exit(1);
}

// Força o nome para lowercase
const componentName = rawName.toLowerCase();

// Define os caminhos
const destFolder = path.resolve(__dirname, `../src/components/${type}s/${componentName}`);
const destFile = path.join(destFolder, `${componentName}.tsx`);
const originalFile = path.resolve(__dirname, `../src/components/${componentName}.tsx`);

try {
    // 1. Executa o comando shadcn
    const command = `npx shadcn@latest add ${componentName}`;
    console.log(`🚀 Executando: ${command}`);
    execSync(command, { stdio: "inherit" });

    // 2. Cria pasta destino
    if (!fs.existsSync(destFolder)) {
        fs.mkdirSync(destFolder, { recursive: true });
    }

    // 3. Move o componente gerado
    if (fs.existsSync(originalFile)) {
        fs.renameSync(originalFile, destFile);
        console.log(`✅ Componente movido para: ${destFile}`);
    } else {
        console.warn(`⚠️ Arquivo não encontrado: ${originalFile}`);
    }

    // 4. Atualiza ou cria o index.ts
    const indexPath = path.resolve(__dirname, `../src/components/${type}s/index.ts`);
    const exportLine = `export * from './${componentName}/${componentName}';\n`;

    let content = "";
    if (fs.existsSync(indexPath)) {
        content = fs.readFileSync(indexPath, "utf-8");
        if (!content.includes(exportLine.trim())) {
            content += exportLine;
        }
    } else {
        content = exportLine;
    }

    fs.writeFileSync(indexPath, content, "utf-8");
    console.log(`📦 Atualizado: ${indexPath}`);

} catch (err) {
    console.error("❌ Erro:", err.message);
    process.exit(1);
}

import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';
import JavaScriptObfuscator from 'javascript-obfuscator';

function findPackageJsonFiles(dir, files = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      findPackageJsonFiles(fullPath, files);
    } else if (entry.name === 'package.json') {
      files.push(fullPath);
    }
  }
  return files;
}

function obfuscateCode(code) {
  return JavaScriptObfuscator.obfuscate(code, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 1,
    numbersToExpressions: true,
    simplify: true,
    stringArrayShuffle: true,
    splitStrings: true,
    stringArrayThreshold: 1,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 1,
    debugProtection: true,
    debugProtectionInterval: 4000,
    disableConsoleOutput: true,
    identifierNamesGenerator: 'hexadecimal',
    rotateStringArray: true,
    selfDefending: true,
    stringArray: true,
    transformObjectKeys: true,
    unicodeEscapeSequence: false
  }).getObfuscatedCode();
}

function getEntryPoints() {
  const entryPoints = {};
  const packageFiles = findPackageJsonFiles('oy-wc');
  
  for (const packageFile of packageFiles) {
    const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
    if (pkg.main) {
      const dirName = path.dirname(packageFile);
      const entryFile = path.join(dirName, pkg.main);
      const widgetName = path.relative('oy-wc', dirName).replace(/\\/g, '/');
      entryPoints[widgetName] = entryFile;
    }
  }
  return entryPoints;
}

async function build() {
  const entryPoints = getEntryPoints();
  
  try {
    const result = await esbuild.build({
      entryPoints,
      outdir: 'oy-wc-dist',
      bundle: true,
      minify: true,
      format: 'esm',
      target: ['es2020'],
      sourcemap: false,
      metafile: true,
      splitting: false,
      outbase: 'oy-wc',
      write: false
    });

    // Create output directories
    for (const output of result.outputFiles) {
      const dir = path.dirname(output.path);
      fs.mkdirSync(dir, { recursive: true });
      const obfuscated = obfuscateCode(output.text);
      fs.writeFileSync(output.path, obfuscated);
    }
    
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
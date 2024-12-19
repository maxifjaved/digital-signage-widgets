import fs from 'fs';
import path from 'path';
import esbuild from 'esbuild';

// Helper to find all package.json files
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

// Helper to get entry points from package.json files
function getEntryPoints() {
  const entryPoints = {};
  const packageFiles = findPackageJsonFiles('oy-wc');
  
  for (const packageFile of packageFiles) {
    const pkg = JSON.parse(fs.readFileSync(packageFile, 'utf8'));
    if (pkg.main) {
      const dirName = path.dirname(packageFile);
      const entryFile = path.join(dirName, pkg.main);
      const widgetName = path.relative('src', dirName).replace(/\\/g, '/');
      entryPoints[widgetName] = entryFile;
    }
  }
  
  return entryPoints;
}

// Build configuration
async function build() {
  const entryPoints = getEntryPoints();
  
  try {
    await esbuild.build({
      entryPoints,
      outdir: 'oy-wc-dist',
      bundle: true,
      minify: true,
      format: 'esm',
      target: ['es2020'],
      sourcemap: true,
      metafile: true,
      splitting: false,
      outbase: 'oy-wc',
    });
    
    console.log('Build completed successfully');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
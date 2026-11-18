// @vitest-environment node
import {spawnSync} from 'node:child_process';
import {describe, expect, it} from 'vitest';
import picomatch from 'picomatch';

describe('picomatch ReDoS mitigation',()=>{
 it('keeps repeated extglobs bounded and preserves ordinary matching semantics',()=>{
  const cases=[
   {pattern:'+(*a)',accepts:['a','ba','baa'],rejects:['ab','b/a'],attack:'a'.repeat(32)+'b'},
   {pattern:'+(*)',accepts:['a','foo.js','xayb'],rejects:['','b/a'],attack:'a'.repeat(32)+'/b'},
   {pattern:'*(*a)',accepts:['a','ba','baa'],rejects:['ab','b/a'],attack:'a'.repeat(32)+'b'},
   {pattern:'+(a*b)',accepts:['ab','axxb','a123b'],rejects:['','xba','a/x/b'],attack:'a'+'x'.repeat(32)+'c'},
  ];

  for(const {pattern,accepts,rejects} of cases){
   const matcher=picomatch(pattern);
   const generated=picomatch.makeRe(pattern);
   // Published vulnerable 4.0.7 generated nested unbounded quantifiers for
   // these repeated-extglob shapes; the pinned community commit removes them.
   expect(generated.source).not.toMatch(/\[\^\/\]\*[^)]*\)(?:\+|\*)/);
   for(const value of accepts) expect(matcher(value),`${pattern} should match ${value}`).toBe(true);
   for(const value of rejects) expect(matcher(value),`${pattern} should reject ${value}`).toBe(false);
  }

  // Run adversarial non-matches in a child with a hard timeout so a future
  // regression cannot stall the whole Vitest process.
  const attackCases=JSON.stringify(cases.map(({pattern,attack})=>[pattern,attack]));
  const script=`for(const [glob,value] of ${attackCases}) if(require('picomatch')(glob)(value)) process.exit(2);`;
  const child=spawnSync(process.execPath,['-e',script],{encoding:'utf8',timeout:5000});
  expect(child.error?.code).not.toBe('ETIMEDOUT');
  expect(child.error).toBeUndefined();
  expect(child.status).toBe(0);
 });
});

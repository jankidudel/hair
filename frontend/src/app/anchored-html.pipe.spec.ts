import { SecurityContext, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { describe, expect, it } from 'vitest';
import { restoreHeadingAnchors } from './anchored-html.pipe';

describe('restoreHeadingAnchors', () => {
  const sanitize = () => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    const sanitizer = TestBed.inject(DomSanitizer);
    return (value: string) =>
      sanitizer.sanitize(SecurityContext.HTML, value) ?? '';
  };

  it('keeps generator heading anchors after Angular sanitization', () => {
    const html = restoreHeadingAnchors(
      '<h2 id="user-content-always-slow">Always slow</h2><h3 id="user-content-no-shape">No shape</h3>',
      sanitize(),
    );
    expect(html).toContain('<h2 id="user-content-always-slow">');
    expect(html).toContain('<h3 id="user-content-no-shape">');
  });

  it('still removes unsafe markup and ids without the generator prefix', () => {
    const html = restoreHeadingAnchors(
      '<h2 id="other">A</h2><p id="user-content-x" onclick="x()">B</p><script>alert(1)</script>',
      sanitize(),
    );
    expect(html).not.toContain('id="other"');
    expect(html).not.toContain('id="user-content-x"');
    expect(html).not.toContain('onclick');
    expect(html).not.toContain('<script');
  });
});

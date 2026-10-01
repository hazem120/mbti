/**
 * Starfield points. Per-star size with distance attenuation, a twinkle from
 * time + a random phase, a blue→violet tint, and a warp mode: as `uWarp`
 * rises each sprite grows along its screen-space radial direction while the
 * fragment keeps its original thickness, so stars stretch into light-speed
 * streaks pointing away from the screen centre.
 *
 * Attributes: aSize, aPhase, aTint (0..1).
 * Uniforms: uTime, uPixelRatio, uScale, uWarp (0..1), uOpacity,
 *           uColorA / uColorB (linear tint endpoints).
 */
export const STARS_VERTEX = /* glsl */ `
attribute float aSize;
attribute float aPhase;
attribute float aTint;

uniform float uTime;
uniform float uPixelRatio;
uniform float uScale;
uniform float uWarp;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec3 vColor;
varying float vTwinkle;
varying vec2 vDir;
varying float vStretch;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vec4 clip = projectionMatrix * mv;

  float speed = 0.6 + aPhase * 1.9;
  vTwinkle = 0.55 + 0.45 * sin(uTime * speed + aPhase * 6.2831853);
  vColor = mix(uColorA, uColorB, aTint);
  // A few stars run hot (white core).
  vColor = mix(vColor, vec3(1.0), smoothstep(2.2, 3.1, aSize) * 0.6);

  vec2 ndc = clip.xy / max(clip.w, 1e-4);
  float radial = length(ndc);
  vDir = radial > 1e-4 ? ndc / radial : vec2(1.0, 0.0);
  vStretch = 1.0 + uWarp * (1.5 + 14.0 * clamp(radial, 0.0, 1.4));

  float size = aSize * uPixelRatio * (uScale / max(-mv.z, 0.1));
  gl_PointSize = min(size * vStretch, 96.0 * uPixelRatio);
  gl_Position = clip;
}
`;

export const STARS_FRAGMENT = /* glsl */ `
uniform float uOpacity;
uniform float uWarp;

varying vec3 vColor;
varying float vTwinkle;
varying vec2 vDir;
varying float vStretch;

void main() {
  // gl_PointCoord is y-down; NDC (vDir) is y-up.
  vec2 p = gl_PointCoord * 2.0 - 1.0;
  p.y = -p.y;
  float along = dot(p, vDir);
  float across = dot(p, vec2(-vDir.y, vDir.x)) * vStretch;
  float r = length(vec2(along, across));
  float disc = 1.0 - smoothstep(0.0, 1.0, r);
  float core = pow(disc, 2.6);
  // Streaks fade toward their tail (inner end).
  float tail = mix(1.0, smoothstep(-1.0, 0.6, along), uWarp);
  float alpha = core * tail * mix(vTwinkle, 1.0, uWarp) * uOpacity;
  if (alpha < 0.003) discard;
  // Additive blending multiplies by alpha, so colour stays unpremultiplied.
  gl_FragColor = vec4(vColor * (1.0 + uWarp * 1.5), alpha);

  #include <colorspace_fragment>
}
`;

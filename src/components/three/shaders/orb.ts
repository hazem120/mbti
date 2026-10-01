import { SIMPLEX_3D } from "@/components/three/shaders/noise";

/**
 * Type orb: a sphere with an animated, domain-warped simplex-noise surface
 * swirl, a fresnel rim in the type accent, and HDR emissive output (values
 * above 1) so the Bloom pass picks it up.
 *
 * Uniforms:
 * - uColor (vec3, linear) accent
 * - uTime  seconds
 * - uSeed  per-orb noise offset
 * - uHover 0..1 hover/focus energy
 * - uDim   0..1 fade toward darkness (other orbs during a flight)
 * - uIntensity overall emissive gain
 */
export const ORB_VERTEX = /* glsl */ `
varying vec3 vNormalV;
varying vec3 vViewDir;
varying vec3 vObjPos;

void main() {
  vObjPos = position;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vNormalV = normalize(normalMatrix * normal);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

export const ORB_FRAGMENT = /* glsl */ `
uniform vec3 uColor;
uniform float uTime;
uniform float uSeed;
uniform float uHover;
uniform float uDim;
uniform float uIntensity;

varying vec3 vNormalV;
varying vec3 vViewDir;
varying vec3 vObjPos;

${SIMPLEX_3D}

void main() {
  vec3 n = normalize(vNormalV);
  vec3 v = normalize(vViewDir);
  float facing = max(dot(n, v), 0.0);
  float fresnel = pow(1.0 - facing, 2.4);

  // Domain-warped noise on the unit sphere: slow swirling plasma.
  vec3 p = normalize(vObjPos) * 1.7 + vec3(uSeed);
  float t = uTime * 0.22;
  float n1 = snoise(p + vec3(0.0, t, t * 0.6));
  float n2 = snoise(p * 2.3 + n1 * 0.85 + vec3(t * 0.7, 0.0, -t));
  float swirl = 0.5 + 0.5 * n2;

  vec3 deep = uColor * 0.16;
  vec3 hot = mix(uColor, vec3(1.0), 0.22);
  vec3 col = mix(deep, uColor, smoothstep(0.18, 0.88, swirl));
  col += hot * pow(swirl, 5.0) * (0.45 + uHover * 0.6);

  // Lit core toward the viewer + accent rim.
  col += uColor * pow(facing, 3.0) * 0.35;
  col += mix(uColor, vec3(1.0), 0.12) * fresnel * (1.6 + uHover * 1.4);

  float energy = uIntensity * (1.0 + uHover * 0.85) * (1.0 - uDim * 0.88);
  gl_FragColor = vec4(col * energy, 1.0);

  #include <colorspace_fragment>
}
`;

/**
 * Atmosphere halo: a back-faced, slightly larger sphere drawn additively.
 * Glow is strongest at the silhouette and falls off outward, so orbs still
 * glow when Bloom is dropped on slow devices.
 */
export const ATMOSPHERE_VERTEX = /* glsl */ `
varying vec3 vNormalV;
varying vec3 vViewDir;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vNormalV = normalize(normalMatrix * normal);
  vViewDir = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

export const ATMOSPHERE_FRAGMENT = /* glsl */ `
uniform vec3 uColor;
uniform float uHover;
uniform float uDim;
uniform float uIntensity;

varying vec3 vNormalV;
varying vec3 vViewDir;

void main() {
  // Back faces: the normal points away from the viewer, so -dot grows
  // toward the centre of the disc and fades to 0 at the outer edge.
  float d = max(-dot(normalize(vNormalV), normalize(vViewDir)), 0.0);
  float glow = pow(d, 2.2) * (1.0 - d * 0.35);
  float energy = uIntensity * (0.55 + uHover * 0.75) * (1.0 - uDim * 0.9);
  // Additive blending (src * alpha + dst): colour carries energy, alpha the falloff.
  gl_FragColor = vec4(uColor * energy, clamp(glow, 0.0, 1.0));

  #include <colorspace_fragment>
}
`;

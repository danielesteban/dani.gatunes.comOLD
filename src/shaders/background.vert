precision mediump float;

attribute vec2 position;
attribute float albedo;
varying vec4 fragAlbedo;
uniform mat4 transform;

void main(void) {
  gl_Position = transform * vec4(position, 0.0, 1.0);
  fragAlbedo = vec4(vec3(albedo), 1.0);
}

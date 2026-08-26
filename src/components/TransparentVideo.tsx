import React, { useEffect, useRef } from 'react';

interface TransparentVideoProps {
  srcMp4: string;
  srcWebm?: string;
  className?: string;
  onEnded?: () => void;
  isInView?: boolean;
}

export const TransparentVideo: React.FC<TransparentVideoProps> = ({
  srcMp4,
  srcWebm,
  className,
  isInView = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let texture: WebGLTexture | null = null;
    let animationFrameId: number;

    try {
      gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
    } catch {
      gl = null;
    }

    if (gl) {
      // Vertex Shader
      const vsSource = `
        attribute vec2 a_position;
        attribute vec2 a_texCoord;
        varying vec2 v_texCoord;
        void main() {
          gl_Position = vec4(a_position, 0, 1);
          v_texCoord = a_texCoord;
        }
      `;

      // Fragment Shader with Smooth Luma-Keying for Pure Transparency on Black
      const fsSource = `
        precision mediump float;
        uniform sampler2D u_image;
        varying vec2 v_texCoord;
        void main() {
          vec4 color = texture2D(u_image, v_texCoord);
          float brightness = max(color.r, max(color.g, color.b));
          // Feather out dark background pixels completely
          float alpha = smoothstep(0.04, 0.14, brightness);
          gl_FragColor = vec4(color.rgb, color.a * alpha);
        }
      `;

      const createShader = (type: number, source: string) => {
        const shader = gl!.createShader(type)!;
        gl!.shaderSource(shader, source);
        gl!.compileShader(shader);
        return shader;
      };

      const vs = createShader(gl.VERTEX_SHADER, vsSource);
      const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
      program = gl.createProgram()!;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      gl.useProgram(program);

      // Position buffer
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          -1, -1,
           1, -1,
          -1,  1,
          -1,  1,
           1, -1,
           1,  1,
        ]),
        gl.STATIC_DRAW
      );

      const positionLoc = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(positionLoc);
      gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

      // Texture coordinate buffer (flipped Y for WebGL texture orientation)
      const texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([
          0, 1,
          1, 1,
          0, 0,
          0, 0,
          1, 1,
          1, 0,
        ]),
        gl.STATIC_DRAW
      );

      const texCoordLoc = gl.getAttribLocation(program, 'a_texCoord');
      gl.enableVertexAttribArray(texCoordLoc);
      gl.vertexAttribPointer(texCoordLoc, 2, gl.FLOAT, false, 0, 0);

      // Create texture
      texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    }

    const render = () => {
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
          canvas.width = video.videoWidth || 540;
          canvas.height = video.videoHeight || 640;
          if (gl) gl.viewport(0, 0, canvas.width, canvas.height);
        }

        if (gl && program && texture) {
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
          gl.clearColor(0, 0, 0, 0);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        } else {
          // 2D fallback with manual luma key
          const ctx2d = canvas.getContext('2d');
          if (ctx2d) {
            ctx2d.drawImage(video, 0, 0, canvas.width, canvas.height);
            const imgData = ctx2d.getImageData(0, 0, canvas.width, canvas.height);
            const data = imgData.data;
            for (let i = 0; i < data.length; i += 4) {
              const maxVal = Math.max(data[i], data[i + 1], data[i + 2]);
              if (maxVal < 15) {
                data[i + 3] = 0;
              } else if (maxVal < 35) {
                data[i + 3] = Math.round(((maxVal - 15) / 20) * 255);
              }
            }
            ctx2d.putImageData(imgData, 0, 0);
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Handle scroll in-view reset & autoplay
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isInView) {
      video.currentTime = 0;
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isInView]);

  return (
    <div className={`relative flex items-center justify-center ${className || ''}`}>
      {/* Hidden Video Source */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        crossOrigin="anonymous"
        className="hidden"
      >
        {srcWebm && <source src={srcWebm} type="video/webm" />}
        <source src={srcMp4} type="video/mp4" />
      </video>

      {/* GPU Hardware-Accelerated 100% Transparent Canvas */}
      <canvas
        ref={canvasRef}
        className="w-full h-full object-contain pointer-events-none select-none drop-shadow-[0_20px_70px_var(--color-accent)]"
      />
    </div>
  );
};

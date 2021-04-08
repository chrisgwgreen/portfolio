var epsilon = 9.5367431640625e-7
var Delaunay = {
  supertriangle: (vertices) => {
    let xmin = Number.POSITIVE_INFINITY
    let ymin = Number.POSITIVE_INFINITY
    let xmax = Number.NEGATIVE_INFINITY
    let ymax = Number.NEGATIVE_INFINITY
    let i = vertices.length - 1
    let dx
    let dy
    let dmax
    let xmid
    let ymid

    for (i; i >= 0; i -= 1) {
      if (vertices[i][0] < xmin) {
        xmin = vertices[i][0]
      }

      if (vertices[i][0] > xmax) {
        xmax = vertices[i][0]
      }

      if (vertices[i][1] < ymin) {
        ymin = vertices[i][1]
      }

      if (vertices[i][1] > ymax) {
        ymax = vertices[i][1]
      }
    }

    dx = xmax - xmin
    dy = ymax - ymin
    dmax = Math.max(dx, dy)
    xmid = xmin + dx * 0.5
    ymid = ymin + dy * 0.5

    return [
      [xmid - 20 * dmax, ymid - dmax],
      [xmid, ymid + 20 * dmax],
      [xmid + 20 * dmax, ymid - dmax]
    ]
  },

  circumcircle: (vertices, i, j, k) => {
    let x1 = vertices[i][0]
    let y1 = vertices[i][1]
    let x2 = vertices[j][0]
    let y2 = vertices[j][1]
    let x3 = vertices[k][0]
    let y3 = vertices[k][1]
    let fabsy1y2 = Math.abs(y1 - y2)
    let fabsy2y3 = Math.abs(y2 - y3)
    let xc
    let yc
    let m1
    let m2
    let mx1
    let mx2
    let my1
    let my2
    let dx
    let dy

    if (fabsy1y2 < epsilon) {
      m2 = -((x3 - x2) / (y3 - y2))
      mx2 = (x2 + x3) / 2.0
      my2 = (y2 + y3) / 2.0
      xc = (x2 + x1) / 2.0
      yc = m2 * (xc - mx2) + my2
    } else if (fabsy2y3 < epsilon) {
      m1 = -((x2 - x1) / (y2 - y1))
      mx1 = (x1 + x2) / 2.0
      my1 = (y1 + y2) / 2.0
      xc = (x3 + x2) / 2.0
      yc = m1 * (xc - mx1) + my1
    } else {
      m1 = -((x2 - x1) / (y2 - y1))
      m2 = -((x3 - x2) / (y3 - y2))
      mx1 = (x1 + x2) / 2.0
      mx2 = (x2 + x3) / 2.0
      my1 = (y1 + y2) / 2.0
      my2 = (y2 + y3) / 2.0
      xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2)
      yc =
        fabsy1y2 > fabsy2y3
          ? m1 * (xc - mx1) + my1
          : m2 * (xc - mx2) + my2
    }

    dx = x2 - xc
    dy = y2 - yc

    return {
      i: i,
      j: j,
      k: k,
      x: xc,
      y: yc,
      r: dx * dx + dy * dy
    }
  },

  dedup: (edges) => {
    let i
    let j = edges.length - 1
    let a
    let b
    let m
    let n

    for (j; j > 0; j -= 1) {
      b = edges[j]
      j -= 1
      a = edges[j]
      i = j - 1

      for (i; i > 0; i -= 1) {
        n = edges[i]
        i -= 1
        m = edges[i]

        if ((a === m && b === n) || (a === n && b === m)) {
          edges.splice(j, 2)
          edges.splice(i, 2)
          break
        }
      }
    }
  },

  triangulate: (vertices) => {
    let n = vertices.length
    let i
    let j
    let indices
    let st
    let open
    let closed
    let edges
    let dx
    let dy
    let a
    let b
    let c

    vertices = vertices.slice(0)
    indices = []
    i = n - 1

    for (i; i >= 0; i -= 1) {
      indices[i] = i
    }

    indices.sort((i, j) => {
      return vertices[j][0] - vertices[i][0]
    })

    st = Delaunay.supertriangle(vertices)
    vertices.push(st[0], st[1], st[2])
    open = [Delaunay.circumcircle(vertices, n, n + 1, n + 2)]
    closed = []
    edges = []
    i = indices.length - 1

    for (i; i >= 0; i -= 1) {
      edges.length = 0
      c = indices[i]
      j = open.length - 1

      for (j; j >= 0; j -= 1) {
        dx = vertices[c][0] - open[j].x
        if (dx > 0.0 && dx * dx > open[j].r) {
          closed.push(open[j])
          open.splice(j, 1)
        } else {
          dy = vertices[c][1] - open[j].y
          if (dx * dx + dy * dy - open[j].r <= epsilon) {
            edges.push(
              open[j].i,
              open[j].j,
              open[j].j,
              open[j].k,
              open[j].k,
              open[j].i
            )

            open.splice(j, 1)
          }
        }
      }

      Delaunay.dedup(edges)

      j = edges.length - 1
      for (j; j >= 0; j -= 1) {
        b = edges[j]
        j -= 1
        a = edges[j]
        open.push(Delaunay.circumcircle(vertices, a, b, c))
      }
    }

    i = open.length - 1

    for (i; i >= 0; i -= 1) {
      closed.push(open[i])
    }

    open.length = 0
    i = closed.length - 1

    for (i; i >= 0; i -= 1) {
      if (closed[i].i < n && closed[i].j < n && closed[i].k < n) {
        open.push(closed[i].i, closed[i].j, closed[i].k)
      }
    }

    return open
  }
}

//============================================================
//
// Copyright (C) 2013 Matthew Wagerfield
//
// Twitter: https://twitter.com/mwagerfield
//
// Permission is hereby granted, free of charge, to any
// person obtaining a copy of this software and associated
// documentation files (the "Software"), to deal in the
// Software without restriction, including without limitation
// the rights to use, copy, modify, merge, publish, distribute,
// sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do
// so, subject to the following conditions:
//
// The above copyright notice and this permission notice
// shall be included in all copies or substantial portions
// of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY
// OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT
// LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
// FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO
// EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
// FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
// AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
// OR OTHER DEALINGS IN THE SOFTWARE.
//
//============================================================

var FSS = {
  FRONT: 0,
  BACK: 1,
  DOUBLE: 2
}

/**
 * @class Array
 * @author Matthew Wagerfield
 */
FSS.Array = typeof Float32Array === 'function' ? Float32Array : Array

/**
 * @class Utils
 * @author Matthew Wagerfield
 */
FSS.Utils = {
  isNumber: function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
  }
}

/**
 * @object Vector3
 * @author Matthew Wagerfield
 */
FSS.Vector3 = {
  create: function (x, y, z) {
    let vector = new FSS.Array(3)
    this.set(vector, x, y, z)
    return vector
  },
  clone: function (a) {
    let vector = this.create()
    this.copy(vector, a)
    return vector
  },
  set: function (target, x, y, z) {
    target[0] = x || 0
    target[1] = y || 0
    target[2] = z || 0
    return this
  },
  setX: function (target, x) {
    target[0] = x || 0
    return this
  },
  setY: function (target, y) {
    target[1] = y || 0
    return this
  },
  setZ: function (target, z) {
    target[2] = z || 0
    return this
  },
  copy: function (target, a) {
    target[0] = a[0]
    target[1] = a[1]
    target[2] = a[2]
    return this
  },
  add: function (target, a) {
    target[0] += a[0]
    target[1] += a[1]
    target[2] += a[2]
    return this
  },
  addVectors: function (target, a, b) {
    target[0] = a[0] + b[0]
    target[1] = a[1] + b[1]
    target[2] = a[2] + b[2]
    return this
  },
  addScalar: function (target, s) {
    target[0] += s
    target[1] += s
    target[2] += s
    return this
  },
  subtract: function (target, a) {
    target[0] -= a[0]
    target[1] -= a[1]
    target[2] -= a[2]
    return this
  },
  subtractVectors: function (target, a, b) {
    target[0] = a[0] - b[0]
    target[1] = a[1] - b[1]
    target[2] = a[2] - b[2]
    return this
  },
  subtractScalar: function (target, s) {
    target[0] -= s
    target[1] -= s
    target[2] -= s
    return this
  },
  multiply: function (target, a) {
    target[0] *= a[0]
    target[1] *= a[1]
    target[2] *= a[2]
    return this
  },
  multiplyVectors: function (target, a, b) {
    target[0] = a[0] * b[0]
    target[1] = a[1] * b[1]
    target[2] = a[2] * b[2]
    return this
  },
  multiplyScalar: function (target, s) {
    target[0] *= s
    target[1] *= s
    target[2] *= s
    return this
  },
  divide: function (target, a) {
    target[0] /= a[0]
    target[1] /= a[1]
    target[2] /= a[2]
    return this
  },
  divideVectors: function (target, a, b) {
    target[0] = a[0] / b[0]
    target[1] = a[1] / b[1]
    target[2] = a[2] / b[2]
    return this
  },
  divideScalar: function (target, s) {
    if (s !== 0) {
      target[0] /= s
      target[1] /= s
      target[2] /= s
    } else {
      target[0] = 0
      target[1] = 0
      target[2] = 0
    }
    return this
  },
  cross: function (target, a) {
    let x = target[0],
      y = target[1],
      z = target[2]

    target[0] = y * a[2] - z * a[1]
    target[1] = z * a[0] - x * a[2]
    target[2] = x * a[1] - y * a[0]

    return this
  },
  crossVectors: function (target, a, b) {
    target[0] = a[1] * b[2] - a[2] * b[1]
    target[1] = a[2] * b[0] - a[0] * b[2]
    target[2] = a[0] * b[1] - a[1] * b[0]
    return this
  },
  min: function (target, value) {
    if (target[0] < value) {
      target[0] = value
    }
    if (target[1] < value) {
      target[1] = value
    }
    if (target[2] < value) {
      target[2] = value
    }
    return this
  },
  max: function (target, value) {
    if (target[0] > value) {
      target[0] = value
    }
    if (target[1] > value) {
      target[1] = value
    }
    if (target[2] > value) {
      target[2] = value
    }
    return this
  },
  clamp: function (target, min, max) {
    this.min(target, min)
    this.max(target, max)
    return this
  },
  limit: function (target, min, max) {
    let length = this.length(target)
    if (min !== null && length < min) {
      this.setLength(target, min)
    } else if (max !== null && length > max) {
      this.setLength(target, max)
    }
    return this
  },
  dot: function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
  },
  normalise: function (target) {
    return this.divideScalar(target, this.length(target))
  },
  negate: function (target) {
    return this.multiplyScalar(target, -1)
  },
  distanceSquared: function (a, b) {
    let dx = a[0] - b[0],
      dy = a[1] - b[1],
      dz = a[2] - b[2]

    return dx * dx + dy * dy + dz * dz
  },
  distance: function (a, b) {
    return Math.sqrt(this.distanceSquared(a, b))
  },
  lengthSquared: function (a) {
    return a[0] * a[0] + a[1] * a[1] + a[2] * a[2]
  },
  length: function (a) {
    return Math.sqrt(this.lengthSquared(a))
  },
  setLength: function (target, l) {
    let length = this.length(target)
    if (length !== 0 && l !== length) {
      this.multiplyScalar(target, l / length)
    }
    return this
  }
}

/**
 * @object Vector4
 * @author Matthew Wagerfield
 */
FSS.Vector4 = {
  create: function (x, y, z) {
    let vector = new FSS.Array(4)
    this.set(vector, x, y, z)
    return vector
  },
  set: function (target, x, y, z, w) {
    target[0] = x || 0
    target[1] = y || 0
    target[2] = z || 0
    target[3] = w || 0
    return this
  },
  setX: function (target, x) {
    target[0] = x || 0
    return this
  },
  setY: function (target, y) {
    target[1] = y || 0
    return this
  },
  setZ: function (target, z) {
    target[2] = z || 0
    return this
  },
  setW: function (target, w) {
    target[3] = w || 0
    return this
  },
  add: function (target, a) {
    target[0] += a[0]
    target[1] += a[1]
    target[2] += a[2]
    target[3] += a[3]
    return this
  },
  multiplyVectors: function (target, a, b) {
    target[0] = a[0] * b[0]
    target[1] = a[1] * b[1]
    target[2] = a[2] * b[2]
    target[3] = a[3] * b[3]
    return this
  },
  multiplyScalar: function (target, s) {
    target[0] *= s
    target[1] *= s
    target[2] *= s
    target[3] *= s
    return this
  },
  min: function (target, value) {
    if (target[0] < value) {
      target[0] = value
    }
    if (target[1] < value) {
      target[1] = value
    }
    if (target[2] < value) {
      target[2] = value
    }
    if (target[3] < value) {
      target[3] = value
    }
    return this
  },
  max: function (target, value) {
    if (target[0] > value) {
      target[0] = value
    }
    if (target[1] > value) {
      target[1] = value
    }
    if (target[2] > value) {
      target[2] = value
    }
    if (target[3] > value) {
      target[3] = value
    }
    return this
  },
  clamp: function (target, min, max) {
    this.min(target, min)
    this.max(target, max)
    return this
  }
}

/**
 * @class Color
 * @author Matthew Wagerfield
 */
FSS.Color = function (hex, opacity) {
  this.rgba = FSS.Vector4.create()
  this.hex = hex || '#000000'
  this.opacity = FSS.Utils.isNumber(opacity) ? opacity : 1
  this.set(this.hex, this.opacity)
}

FSS.Color.prototype = {
  set: function (hex, opacity) {
    hex = hex.replace('#', '')

    let size = hex.length / 3

    this.rgba[0] = parseInt(hex.substring(0, size), 16) / 255
    this.rgba[1] = parseInt(hex.substring(size, size * 2), 16) / 255
    this.rgba[2] =
      parseInt(hex.substring(size * 2, size * 3), 16) / 255
    this.rgba[3] = FSS.Utils.isNumber(opacity)
      ? opacity
      : this.rgba[3]

    return this
  },
  hexify: function (channel) {
    let hex = Math.ceil(channel * 255).toString(16)
    if (hex.length === 1) {
      hex = '0' + hex
    }
    return hex
  },
  format: function () {
    let r = this.hexify(this.rgba[0]),
      g = this.hexify(this.rgba[1]),
      b = this.hexify(this.rgba[2])

    this.hex = '#' + r + g + b

    return this.hex
  }
}

/**
 * @class Object
 * @author Matthew Wagerfield
 */
FSS.Object = function () {
  this.position = FSS.Vector3.create()
}

FSS.Object.prototype = {
  setPosition: function (x, y, z) {
    FSS.Vector3.set(this.position, x, y, z)
    return this
  }
}

/**
 * @class Light
 * @author Matthew Wagerfield
 */
FSS.Light = function (ambient, diffuse) {
  FSS.Object.call(this)
  this.ambient = new FSS.Color(ambient || '#FFFFFF')
  this.diffuse = new FSS.Color(diffuse || '#FFFFFF')
  this.ray = FSS.Vector3.create()
}

FSS.Light.prototype = Object.create(FSS.Object.prototype)

/**
 * @class Vertex
 * @author Matthew Wagerfield
 */
FSS.Vertex = function (x, y, z) {
  this.position = FSS.Vector3.create(x, y, z)
}

FSS.Vertex.prototype = {
  setPosition: function (x, y, z) {
    FSS.Vector3.set(this.position, x, y, z)
    return this
  }
}

/**
 * @class Triangle
 * @author Matthew Wagerfield
 */
FSS.Triangle = function (a, b, c) {
  this.a = a || new FSS.Vertex()
  this.b = b || new FSS.Vertex()
  this.c = c || new FSS.Vertex()
  this.vertices = [this.a, this.b, this.c]
  this.u = FSS.Vector3.create()
  this.v = FSS.Vector3.create()
  this.centroid = FSS.Vector3.create()
  this.normal = FSS.Vector3.create()
  this.color = new FSS.Color()
  this.polygon = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'polygon'
  )
  this.polygon.setAttributeNS(null, 'stroke-linejoin', 'round')
  this.polygon.setAttributeNS(null, 'stroke-miterlimit', '1')
  this.polygon.setAttributeNS(null, 'stroke-width', '1')
  this.computeCentroid()
  this.computeNormal()
}

FSS.Triangle.prototype = {
  computeCentroid: function () {
    this.centroid[0] =
      this.a.position[0] + this.b.position[0] + this.c.position[0]
    this.centroid[1] =
      this.a.position[1] + this.b.position[1] + this.c.position[1]
    this.centroid[2] =
      this.a.position[2] + this.b.position[2] + this.c.position[2]
    FSS.Vector3.divideScalar(this.centroid, 3)
    return this
  },
  computeNormal: function () {
    FSS.Vector3.subtractVectors(
      this.u,
      this.b.position,
      this.a.position
    )
    FSS.Vector3.subtractVectors(
      this.v,
      this.c.position,
      this.a.position
    )
    FSS.Vector3.crossVectors(this.normal, this.u, this.v)
    FSS.Vector3.normalise(this.normal)
    return this
  }
}

/**
 * @class Geometry
 * @author Matthew Wagerfield
 */
FSS.Geometry = function () {
  this.vertices = []
  this.triangles = []
  this.dirty = false
}

FSS.Geometry.prototype = {
  update: function () {
    let t = this.triangles.length - 1,
      triangle

    if (this.dirty) {
      for (t; t >= 0; t -= 1) {
        triangle = this.triangles[t]
        triangle.computeCentroid()
        triangle.computeNormal()
      }

      this.dirty = false
    }
    return this
  }
}

/**
 * @class Plane
 * @author Matthew Wagerfield, modified by Maksim Surguy to implement Delaunay triangulation
 */
FSS.Plane = function (width, height, howmany) {
  this.render(width, height, howmany)
}

FSS.Plane.prototype = Object.create(FSS.Geometry.prototype)

FSS.Plane.prototype.render = function (width, height, howmany) {
  FSS.Geometry.call(this)
  this.width = width || 100
  this.height = height || 100

  // Cache letiables
  let x,
    y,
    vertices = new Array(howmany),
    offsetX = this.width * -0.5,
    offsetY = this.height * 0.5,
    i = vertices.length - 1,
    triangles,
    v1,
    v2,
    v3,
    t1

  for (i; i >= 0; i -= 1) {
    x = offsetX + Math.random() * width
    y = offsetY - Math.random() * height
    vertices[i] = [x, y]
  }

  // Generate additional points on the perimeter so that there are no holes in the pattern
  vertices.push([offsetX, offsetY])
  vertices.push([offsetX + width / 2, offsetY])
  vertices.push([offsetX + width, offsetY])
  vertices.push([offsetX + width, offsetY - height / 2])
  vertices.push([offsetX + width, offsetY - height])
  vertices.push([offsetX + width / 2, offsetY - height])
  vertices.push([offsetX, offsetY - height])
  vertices.push([offsetX, offsetY - height / 2])

  // Generate additional randomly placed points on the perimeter
  i = 6
  for (i; i >= 0; i -= 1) {
    vertices.push([offsetX + Math.random() * width, offsetY])
    vertices.push([offsetX, offsetY - Math.random() * height])
    vertices.push([offsetX + width, offsetY - Math.random() * height])
    vertices.push([offsetX + Math.random() * width, offsetY - height])
  }

  // Create an array of triangulated coordinates from our vertices
  triangles = Delaunay.triangulate(vertices)
  i = triangles.length - 1

  for (i; i >= 0; i -= 1) {
    v1 = new FSS.Vertex(
      Math.ceil(vertices[triangles[i]][0]),
      Math.ceil(vertices[triangles[i]][1])
    )
    i -= 1
    v2 = new FSS.Vertex(
      Math.ceil(vertices[triangles[i]][0]),
      Math.ceil(vertices[triangles[i]][1])
    )
    i -= 1
    v3 = new FSS.Vertex(
      Math.ceil(vertices[triangles[i]][0]),
      Math.ceil(vertices[triangles[i]][1])
    )
    t1 = new FSS.Triangle(v1, v2, v3)

    this.triangles.push(t1)
    this.vertices.push(v1)
    this.vertices.push(v2)
    this.vertices.push(v3)
  }
}

/**
 * @class Material
 * @author Matthew Wagerfield
 */
FSS.Material = function (ambient, diffuse) {
  this.ambient = new FSS.Color(ambient || '#444444')
  this.diffuse = new FSS.Color(diffuse || '#FFFFFF')
  this.slave = new FSS.Color()
}

/**
 * @class Mesh
 * @author Matthew Wagerfield
 */
FSS.Mesh = function (geometry, material) {
  FSS.Object.call(this)
  this.geometry = geometry || new FSS.Geometry()
  this.material = material || new FSS.Material()
  this.side = FSS.FRONT
  this.visible = true
}

FSS.Mesh.prototype = Object.create(FSS.Object.prototype)

FSS.Mesh.prototype.update = function (lights, calculate) {
  let t, triangle, l, light, illuminance

  // Update Geometry
  this.geometry.update()

  // Calculate the triangle colors
  if (calculate) {
    // Iterate through Triangles
    t = this.geometry.triangles.length - 1
    for (t; t >= 0; t -= 1) {
      triangle = this.geometry.triangles[t]

      // Reset Triangle Color
      FSS.Vector4.set(triangle.color.rgba)

      // Iterate through Lights
      l = lights.length - 1
      for (l; l >= 0; l -= 1) {
        light = lights[l]

        // Calculate Illuminance
        FSS.Vector3.subtractVectors(
          light.ray,
          light.position,
          triangle.centroid
        )
        FSS.Vector3.normalise(light.ray)

        illuminance = Math.max(
          FSS.Vector3.dot(triangle.normal, light.ray),
          0
        )

        // Calculate Ambient Light
        FSS.Vector4.multiplyVectors(
          this.material.slave.rgba,
          this.material.ambient.rgba,
          light.ambient.rgba
        )
        FSS.Vector4.add(triangle.color.rgba, this.material.slave.rgba)

        // Calculate Diffuse Light
        FSS.Vector4.multiplyVectors(
          this.material.slave.rgba,
          this.material.diffuse.rgba,
          light.diffuse.rgba
        )
        FSS.Vector4.multiplyScalar(
          this.material.slave.rgba,
          illuminance
        )
        FSS.Vector4.add(triangle.color.rgba, this.material.slave.rgba)
      }

      // Clamp & Format Color
      FSS.Vector4.clamp(triangle.color.rgba, 0, 1)
    }
  }
  return this
}

/**
 * @class Scene
 * @author Matthew Wagerfield
 */
FSS.Scene = function () {
  this.meshes = []
  this.lights = []
}

FSS.Scene.prototype = {
  add: function (object) {
    if (object instanceof FSS.Mesh && !~this.meshes.indexOf(object)) {
      this.meshes.push(object)
    } else if (
      object instanceof FSS.Light &&
      !~this.lights.indexOf(object)
    ) {
      this.lights.push(object)
    }
    return this
  }
}

/**
 * @class Renderer
 * @author Matthew Wagerfield
 */
FSS.Renderer = function () {
  this.width = 0
  this.height = 0
  this.halfWidth = 0
  this.halfHeight = 0
}

FSS.Renderer.prototype = {
  setSize: function (width, height) {
    if (this.width === width && this.height === height) {
      return
    }
    this.width = width
    this.height = height
    this.halfWidth = this.width * 0.5
    this.halfHeight = this.height * 0.5
    return this
  },
  clear: function () {
    return this
  },
  render: function () {
    return this
  }
}

/**
 * @class Canvas Renderer
 * @author Matthew Wagerfield
 */
FSS.CanvasRenderer = function () {
  FSS.Renderer.call(this)
  this.element = document.createElement('canvas')
  this.element.style.display = 'block'
  this.context = this.element.getContext('2d')

  this.context.lineJoin = 'round'
  this.context.lineWidth = 1

  this.setSize(this.element.width, this.element.height)
}

FSS.CanvasRenderer.prototype = Object.create(FSS.Renderer.prototype)

FSS.CanvasRenderer.prototype.setSize = function (width, height) {
  FSS.Renderer.prototype.setSize.call(this, width, height)
  this.element.width = width
  this.element.height = height
  this.context.setTransform(
    1,
    0,
    0,
    -1,
    this.halfWidth,
    this.halfHeight
  )
  return this
}

FSS.CanvasRenderer.prototype.clear = function () {
  FSS.Renderer.prototype.clear.call(this)
  this.context.clearRect(
    -this.halfWidth,
    -this.halfHeight,
    this.width,
    this.height
  )
  return this
}

FSS.CanvasRenderer.prototype.render = function (scene, callback) {
  FSS.Renderer.prototype.render.call(this, scene)

  let m, mesh, t, triangle, color

  // Clear Context
  this.clear()

  // Update Meshes
  m = scene.meshes.length - 1

  for (m; m >= 0; m -= 1) {
    mesh = scene.meshes[m]

    mesh.update(scene.lights, true)

    // Render Triangles
    t = mesh.geometry.triangles.length - 1

    for (t; t >= 0; t -= 1) {
      triangle = mesh.geometry.triangles[t]
      color = triangle.color.format()
      this.context.beginPath()
      this.context.moveTo(
        triangle.a.position[0],
        triangle.a.position[1]
      )
      this.context.lineTo(
        triangle.b.position[0],
        triangle.b.position[1]
      )
      this.context.lineTo(
        triangle.c.position[0],
        triangle.c.position[1]
      )
      this.context.strokeStyle = color
      this.context.fillStyle = color
      this.context.stroke()
      this.context.fill()
      this.context.closePath()
    }
  }

  if (callback !== undefined) {
    callback()
  }

  return this
}

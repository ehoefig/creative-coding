class Particle {

    constructor(x, y, life) {
        this.location = createVector(x, y)
        this.velocity = createVector()
        this.rotation = 0;
        this.life = life
    }

    update() {
        this.location.add(this.velocity)
        this.velocity.rotate(this.rotation);
        return --this.life > 0
    }

    show() {
        strokeWeight(5)
        stroke(255 - this.life / 2)
        point(this.location.x, this.location.y)
    }

    clone() {
        let p = new Particle(this.location.x, this.location.y, this.life)
        p.velocity = this.velocity.copy()
        p.rotation = this.rotation
        return p;
    }

}

class ParticleSystem {

    constructor() {
        this.particles = new Set();
    }

    spawn(x = 0, y = 0, life = 500) {
        let particle = new Particle(x, y, life)
        this.particles.add(particle)
        return particle;
    }

    update() {
        let dead = []
        let spawned = []
        this.particles.forEach(function(p) {
            if (!p.update()) dead.push(p)
            let spawnTime = Math.random() < 0.005
            if (spawnTime) {
                let p1 = p.clone()
                p1.velocity.rotate(-PI/4);
                p1.rotation = -0.01
                p1.life = p.life + 40
                spawned.push(p1)
                let p2 = p.clone()
                p1.velocity.rotate(PI/4);
                p2.rotation = 0.01
                p2.life = p.life + 40
                spawned.push(p2);
            }
        });
        dead.forEach(d => this.particles.delete(d))
        spawned.forEach(s => this.particles.add(s))
    }

    show() {
        this.particles.forEach(p => p.show());
    }
}
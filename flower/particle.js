class Particle {

    constructor(system) {
        this.system = system
        this.location = createVector()
        this.velocity = createVector()
        this.spin = 0
        this.spin_acceleration = 0
        this.life = 0
        this.incarnation = 0
        system.born(this)
    }

    update() {
        this.location.add(this.velocity)
        this.spin += this.spin_acceleration;
        this.velocity.rotate(this.spin);

        this.life -= (this.incarnation + 1) * 0.3 + 0.2;

        if (this.life < 0) system.die(this);

        // Spawned?
        if (this.incarnation < 2) {
            const spawnTime = Math.random() < this.life / 30000.0
            if (spawnTime) {
                
                let p1 = this.clone()
                p1.spin_acceleration = (p1.incarnation / p1.life) * -0.02
                this.system.born(p1)

                let p2 = this.clone()
                p2.spin_acceleration = (p2.incarnation / p2.life) * 0.02
                this.system.born(p2)
            }
        }
    }

    show() {
        strokeWeight(1)
        stroke(0)
        //stroke(255 - this.life / 2)
        point(this.location.x, this.location.y)
    }

    clone() {
        let p = new Particle(system)
        p.location.set(this.location.x, this.location.y)
        p.velocity.set(this.velocity.x, this.velocity.y)
        p.spin = this.spin
        p.spin_acceleration = this.spin_acceleration
        p.life = this.life
        p.incarnation = this.incarnation + 1
        return p;
    }

}

class ParticleSystem {

    constructor() {
        this.particles = new Set();
    }

    born(particle) {
        this.particles.add(particle)
    }

    die(particle) {
        this.particles.delete(particle);
    }

    spawn(x = 0, y = 0, life = 500) {
        let particle = new Particle(this)
        particle.location.set(x, y);
        particle.life = life

        return particle;
    }

    update() {
        this.particles.forEach(p => p.update())
    }

    show() {
        this.particles.forEach(p => p.show())
    }
}
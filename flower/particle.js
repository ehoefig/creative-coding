class Particle {

    constructor(system) {
        this.system = system
        this.location = createVector()
        this.formerLocation = createVector()
        this.velocity = createVector()
        this.spin = 0
        this.spin_acceleration = 0
        this.life = 0
        this.incarnation = 0
        system.born(this)
    }s

    update() {
        this.location.add(this.velocity)
        this.spin += this.spin_acceleration
        this.velocity.rotate(this.spin)

        this.life -= (this.incarnation + 1) * 0.3 + 0.2

        if (this.life < 0) system.die(this);

        // Spawned?
        if (this.incarnation < 2) {
            const spawnTime = Math.random() < this.life / 40000.0
            if (spawnTime) {
                
                let p1 = this.clone()
                p1.spin_acceleration = (p1.incarnation * 3.5 / p1.life * 0.35) * -0.015
                p1.life += 50 * random(-1, 1)

                let p2 = this.clone()
                p2.spin_acceleration = (p2.incarnation * 3.5 / p2.life * 0.35) * 0.015
                p2.life += 50 * random(-1, 1)
            }
        }

        this.formerLocation.set(this.location)
    }

    show() {
        strokeWeight(this.life / 50)
        stroke(0)
        //stroke(255 - this.life / 2)
        const ppos = this.formerLocation
        const pos = this.location
        line(ppos.x, ppos.y, pos.x, pos.y)
        //point(this.location.x, this.location.y)
    }

    clone() {
        let p = new Particle(system)
        p.location.set(this.location)
        p.formerLocation.set(this.formerLocation)
        p.velocity.set(this.velocity)
        p.spin = this.spin
        p.spin_acceleration = this.spin_acceleration
        p.life = this.life
        p.incarnation = this.incarnation + 1
        this.system.born(p);
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
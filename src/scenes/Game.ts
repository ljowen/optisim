import { BodyType } from "matter";
import Phaser from "phaser";

export default class Demo extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  hull!: Phaser.Physics.Matter.Image;
  sail!: Phaser.Physics.Matter.Image;
  boat!: BodyType;
  wind!: BodyType;
  mainSheet!: MatterJS.ConstraintType;
  text!: Phaser.GameObjects.Text;

  graphics: any;
  windAngle!: Phaser.Math.Euler;

  preload() {
    this.load.image("hull", "assets/hull.png");
    this.load.image("sail", "assets/sail.png");
  }

  create() {
    this.matter.world.setBounds();

    
    this.hull = this.matter.add.image(400, 300, "hull");
    // this.hull.set
    this.hull.scale = 0.3;
    this.hull.setRectangle(80, 40);
    this.hull.setRotation(0);
    this.hull.setOrigin()

    // this.sail = this.matter.add.image(400, 300, "sail");
    // this.sail.setMass(0.01);
    // this.sail.scale = 0.5;
    // this.sail.setRectangle(10, 70);

    this.wind = this.matter.add.polygon(100, 100, 3, 20, {});
    this.wind.isStatic = true;
    
    // this.boat = this.matter.body.create({
    //   parts: [ this.sail.body as BodyType,
    //     this.hull.body as BodyType
    //   ]
    // });
    // this.matter.add.constraint(
    //   this.player.body as BodyType,
    //   this.sail.body as BodyType,
    //   0,
    //   1,
    //   {
    //     pointA: { x: 0, y: 0 },
    //     pointB: { x: 0, y: 30 },
    //   }
    // );

    // this.player.setCollisionGroup(1);
    // const sailGroup = this.matter.world.nextGroup();
    // this.sail.setCollisionGroup(2);
    // this.sail.setCollidesWith(0);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.text = this.add.text(
      0,
      0,
      `Wind Angle: 0
Sail Angle: 20'
Wind Speed: 0
    `,
      { fontSize: "24px" }
    );

    this.graphics = this.add.graphics({
      lineStyle: { width: 2, color: 0xaa00aa },
    });
  }

  update(time: number, delta: number): void {
    // Velocity = Wind Speed * (cos(Wind Angle - Sail Angle))

    const sailAngle = (this.hull.rotation) - 0.5*Math.PI;
    const vBoat = 0.1 * Math.max(5, 10 * Math.cos(0 - sailAngle ));
    this.text.setText(
      `Wind Angle: ${0}
Sail Angle: ${this.hull.rotation}
vWind: 10
vBoat: ${vBoat} 
    `
    );
    this.graphics.clear();

    // this.sail.setVelocity()
    // this.hull.thrust(0.0001);
    // this.hull.thrust(0.00001 * vBoat);
    this.hull.thrust(0.0001 * vBoat)
    // this.hull.setVelocity(vBoat * Math.cos(this.hull.rotation), vBoat * Math.sin(this.hull.rotation));
    if (this.cursors.left.isDown) {
      this.hull.angle += 1;
    }
    if (this.cursors.right.isDown) {
      this.hull.angle -= 1;
    }
    // if (this.cursors.up.isDown) {
    //   this.sail.rotation += 0.05;
    // }
    // if (this.cursors.down.isDown) {
    //   this.sail.rotation -= 0.05;
    // }
  }
}

import { BodyType } from "matter";
import Phaser from "phaser";

export default class Demo extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }
  cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  player!: Phaser.Physics.Matter.Image;
  sail!: Phaser.Physics.Matter.Image;
  wind!: BodyType;
  mainSheet!: MatterJS.ConstraintType;

  preload() {
    this.load.image("hull", "assets/hull.png");
    this.load.image("sail", "assets/sail.png");
  }

  create() {
    this.matter.world.setBounds();

    // this.player = this.physics.add.sprite(10, 45, "hull");
    this.player = this.matter.add.image(400, 300, "hull");
    this.player.scale = 0.3;
    this.player.setRectangle(80, 40);
    this.player.setRotation(Math.PI);

    this.sail = this.matter.add.image(400, 300, "sail");
    this.sail.setMass(0.01);
    this.sail.scale = 0.5;
    this.sail.setRectangle(10, 70);
    // this.sail.setPosition(700, 30);
    // this.sail.setStatic(true);
    // this.sail.setOrigin(0.1, 0.1);
    // this.sail.centerOfMass.set(80,80)

    /* Create hinge of boom to hull */

    // let constraint = this.matter.constraint.create()

    // Attach boom to mast
    this.matter.add.constraint(
      this.player.body as BodyType,
      this.sail.body as BodyType,
      0,
      0.7,
      {
        pointA: { x: 0, y: 0 },
        pointB: { x: 0, y: 30 },
      }
    );

    // Attach main sheet
    this.mainSheet = this.matter.add.constraint(
      this.player.body as BodyType,
      this.sail.body as BodyType,
      30,
      0.999,
      {
        pointA: { x: 30, y: 0 },
        pointB: { x: 0, y: -30 },
      }
    );

    this.player.setCollisionGroup(1);
    // const sailGroup = this.matter.world.nextGroup();
    this.sail.setCollisionGroup(2);
    this.sail.setCollidesWith(0);

    this.wind = this.matter.add.polygon(100, 100, 3, 20, {});
    this.wind.isStatic = true;
    this.player.setFrictionAir(0.1);
    this.player.setMass(40);
    this.player.setFixedRotation();

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time: number, delta: number): void {
    // this.sail.copyPosition(this.player.getCenter());
    // this.sail.setRotation(this.player.rotation + Math.PI / 2);
    // this.sail.setRotation(    Phaser.Math.Angle.BetweenPoints(
    //   this.sail.body.position,
    //   this.wind.position
    // ));

    // this.player.thrust(0.025);
    // this.player.applyForceFrom(
    //   new Phaser.Math.Vector2(this.wind.position),
    //   new Phaser.Math.Vector2(0.01,0.01)
    // );

    if(this.mainSheet.length )

    this.sail.applyForceFrom(
      new Phaser.Math.Vector2(this.wind.position),
      new Phaser.Math.Vector2(0.001, 0.001)
    );
    console.log(this.mainSheet.length);
    if (this.cursors.shift.isDown && this.cursors.up.isDown) {
      if(this.mainSheet.length < 60)
      this.mainSheet.length += 1;
    } else if (this.cursors.shift.isDown && this.cursors.down.isDown) {
      if(this.mainSheet.length > 20)
      this.mainSheet.length -= 1;
    } else if (this.cursors.up.isDown) {
      this.player.thrust(0.025);
    }
    if (this.cursors.left.isDown) {
      this.player.setAngularVelocity(0.05);
    }
    if (this.cursors.right.isDown) {
      this.player.setAngularVelocity(-0.05);
    }
  }
}

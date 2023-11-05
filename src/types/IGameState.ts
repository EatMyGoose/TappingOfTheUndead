import { Enemy } from "./Enemy";
import { FPSCounter } from "./FPSCounter";
import { Player } from "./Player";
import { Recticle } from "./Reticle";
import { IDiposable } from "./IDisposable";
import { Explosion } from "./Explosion";
import { EnemyController } from "./EnemyController";
import { MorseListener } from "./MorseListener";
import { Background } from "./Background";
import { MorseInputDisplay } from "./MorseInputDisplay";
import { ScreenShakeController } from "./ScreenShakeController";
import { GooseJumpscare } from "./GooseJumpscare";
import { Scoreboard } from "./Scoreboard";

export interface IGameState
{
    background: Background
    enemyController: EnemyController
    player: Player
    enemies: Enemy[]
    fpsCounter: FPSCounter
    recticle: Recticle
    explosions: Explosion[]
    morseListener: MorseListener
    morseInputDisplay: MorseInputDisplay
    screenShake: ScreenShakeController
    jumpscares: GooseJumpscare[]
    scoreboard: Scoreboard
}

export const initialGameState: IGameState = {
    background: new Background(),
    enemyController: new EnemyController(),
    player: new Player(),
    enemies: [],
    fpsCounter: new FPSCounter(),
    recticle: new Recticle(),
    explosions: [],
    morseListener: new MorseListener(),
    morseInputDisplay: new MorseInputDisplay(),
    screenShake: new ScreenShakeController(),
    jumpscares: [],
    scoreboard: new Scoreboard()
};

export function cloneGameState(gameState: IGameState) : IGameState
{
    const background = Background.clone(gameState.background);
    const enemyController = EnemyController.clone(gameState.enemyController);
    const player = Player.clone(gameState.player);
    const fpsCounter = FPSCounter.clone(gameState.fpsCounter);
    const recticle =  Recticle.clone(gameState.recticle);
    const morseListener = MorseListener.clone(gameState.morseListener);
    const morseInputDisplay = MorseInputDisplay.clone(gameState.morseInputDisplay);
    const screenShake = ScreenShakeController.clone(gameState.screenShake);
    const scoreboard = Scoreboard.clone(gameState.scoreboard);

    const enemies = dispose(gameState.enemies).map((enemy => Enemy.clone(enemy)));
    const explosions = dispose(gameState.explosions).map(explosion => Explosion.clone(explosion));
    const jumpscares = dispose(gameState.jumpscares).map(jumpscare => GooseJumpscare.clone(jumpscare))

    return {
        background,
        enemyController,
        player,
        enemies,
        fpsCounter,
        recticle,
        explosions,
        morseListener,
        morseInputDisplay,
        screenShake,
        jumpscares,
        scoreboard
    }
}

export function dispose<T extends IDiposable>(arr: T[]) : T[]
{
    return arr.filter(e => !e.dispose);
}

export function get_enemy(id: number, gameState: IGameState) : Enemy | undefined
{
    return gameState.enemies.find(e => e.id === id);
}
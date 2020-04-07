import Logger from '@highoutput/logger';
import AppError from '@highoutput/error';

const logger = new Logger(['elasticml']);

class RandomLog {
  private opts: { max: number, interval: number };
  private logger: Logger;
  private errors: AppError[] = [
    new AppError('ENTITY_EXISTS', 'Entity exists.', { username: '' }),
    new AppError('INVALID_OPERATION', 'Double Payment.', { username: '' }),
    new AppError('INVALID_REQUEST', 'Entity exists.', { programme: '' }),
  ];
  private logs: string[] = [
    'EntityCreated event projected',
    'EntityUpdated event projected',
    'EntityDeleted event projected',
    'EntityActivated event projected',
    'EntityCreated event applied',
    'EntityUpdated event applied',
    'EntityDeleted event applied',
    'EntityActivated event applied',
  ];

  public constructor (
    logger: Logger,
    opts?: { max: number, interval: number },
  ) {
    this.logger = logger || new Logger(['log', 'random']);
    this.opts = { max: 1000, interval: 500, ...opts };
  }

  public randomize(): string | AppError {
    return [
      this.errors[Math.round(Math.random() * 2)],
      this.logs[Math.round(Math.random() * 7)],
    ][Math.round(Math.random())];
  }

  public async start() {
    let idx = 0;
    let log: string | AppError;

    while(idx < this.opts.max) {
      log = this.randomize();

      if (log instanceof AppError) {
        this.logger.error(log);
      } else {
        this.logger.info(log);
      }

      idx += 1;
    }
  }

  /* TODO, figure out how to stop the randomizer if its in the middle of the loop */
  public async stop() {}
}

new RandomLog(logger, { max: 10000, interval: 500 }).start();

import { Service } from 'typedi';
import { format } from 'date-fns';

@Service()
export class LogRecorder {
  public generate = (message: string): void => {
    const now = Date.now();
    const dateString = format(now, 'dd/MM/yyyy');
    const timeString = format(now, 'kk:mm:ss');

    console.log(`${dateString} ${timeString} - ${message}`);
  };
}

export const simulation2_details = {
  title: "Scenario 2: Circular Wait Deadlock",
  info: "Processes hold resources while waiting for others, causing deadlock.",
  code: {
    "Main.java": `
import java.util.concurrent.atomic.AtomicBoolean;

class WorkerThread implements Runnable {
  private final AtomicBoolean workDone;
  private final AtomicBoolean monitorActive;

  public WorkerThread(AtomicBoolean workDone, AtomicBoolean monitorActive) {
      this.workDone = workDone;
      this.monitorActive = monitorActive;
  }

  @Override
  public void run() {
      while (!workDone.get()) {
          if (monitorActive.get()) {
              System.out.println("Worker: Monitor is checking, backing off...");
              try {
                  Thread.sleep(100); // Simulate backing off
              } catch (InterruptedException e) {
                  Thread.currentThread().interrupt();
              }
              continue;
          }
          
          System.out.println("Worker: Working on the task...");
          try {
              Thread.sleep(500); // Simulate work
          } catch (InterruptedException e) {
              Thread.currentThread().interrupt();
          }
          workDone.set(true);
          System.out.println("Worker: Task completed!");
      }
  }
}

class MonitorThread implements Runnable {
  private final AtomicBoolean workDone;
  private final AtomicBoolean monitorActive;

  public MonitorThread(AtomicBoolean workDone, AtomicBoolean monitorActive) {
      this.workDone = workDone;
      this.monitorActive = monitorActive;
  }

  @Override
  public void run() {
      while (!workDone.get()) {
          monitorActive.set(true);
          System.out.println("Monitor: Checking if the work is done...");
          try {
              Thread.sleep(200); // Simulate status check delay
          } catch (InterruptedException e) {
              Thread.currentThread().interrupt();
          }
          monitorActive.set(false);
      }
      System.out.println("Monitor: Work detected as completed.");
  }
}

public class SpinlockLivelockSimulation {
  public static void main(String[] args) {
      AtomicBoolean workDone = new AtomicBoolean(false);
      AtomicBoolean monitorActive = new AtomicBoolean(false);

      Thread worker = new Thread(new WorkerThread(workDone, monitorActive));
      Thread monitor = new Thread(new MonitorThread(workDone, monitorActive));

      worker.start();
      monitor.start();
  }
}`,
  },
};

export const simulation2_details = {
    title: "Scenario 2: Spinlock Livelock - Worker & Monitor",
    info: "A worker thread keeps yielding to a monitor thread, preventing progress and causing livelock.",
    description: (
        <div>
            <h2 className="text-xl font-bold text-blue-400">
                Spinlock Livelock - Worker & Monitor
            </h2>
            <p>
                This simulation demonstrates a <strong>livelock</strong> scenario between two threads:
                a <strong>Worker</strong> that tries to complete a task and a <strong>Monitor</strong>
                that checks its progress. Both use <code>AtomicBoolean</code> variables to
                coordinate, but they may end up <strong>yielding indefinitely</strong>.
            </p>

            <h3 className="text-lg font-semibold mt-4">🛠 How This Happens</h3>
            <ul className="list-disc list-inside ml-4">
                <li>The worker starts processing a task.</li>
                <li>The monitor begins checking, setting <code>monitorActive = true</code>.</li>
                <li>The worker sees the monitor is active and <strong>backs off</strong>.</li>
                <li>The monitor finishes checking and sets <code>monitorActive = false</code>.</li>
                <li>
                    However, before the worker can proceed, the monitor may start another
                    check, causing a cycle where neither progresses efficiently.
                </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">🎯 Real-World Example</h3>
            <p>Imagine two people trying to walk through a narrow corridor:</p>
            <ul className="list-disc list-inside ml-4">
                <li>One steps forward but sees the other doing the same, so they stop.</li>
                <li>The other person also stops, waiting for the first person.</li>
                <li>Both keep yielding to each other, causing a <strong>livelock</strong>.</li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">✅ Possible Solutions</h3>
            <ul className="list-disc list-inside ml-4">
                <li>
                    <strong>Randomized Backoff:</strong> Introduce a small, randomized delay
                    to avoid synchronization issues.
                </li>
                <li>
                    <strong>Monitor Frequency Adjustment:</strong> Reduce the monitor's check
                    frequency so the worker gets a chance to progress.
                </li>
                <li>
                    <strong>Timeout Mechanism:</strong> If backing off too many times, force
                    the worker to proceed.
                </li>
            </ul>

            <h3 className="text-lg font-semibold mt-4">💡 Key Takeaways</h3>
            <ul className="list-disc list-inside ml-4">
                <li>Livelock happens when processes <strong>over-adjust</strong> to each other.</li>
                <li>It differs from a deadlock, where threads are stuck <strong>waiting indefinitely</strong>.</li>
                <li>Small timing changes can break livelocks, improving efficiency.</li>
            </ul>
        </div>
    )
    ,
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

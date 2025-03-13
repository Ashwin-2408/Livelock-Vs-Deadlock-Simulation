export const simulation3_details = {
  title: "Scenario 3: Over-Polite Workers Livelock",
  info: "Two threads repeatedly yield to each other out of politeness, preventing progress and causing livelock.",
  description: (
    <div>
      <div class="max-w-3xl mx-auto p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-bold text-blue-400">
          High-Priority Preemption - Livelock
        </h2>
        <p class="mt-2 text-white!">
          In this scenario, a low-priority task gets repeatedly{" "}
          <strong class="text-red-500">preempted</strong> by a high-priority
          task. The system keeps giving control to the high-priority task,
          preventing the low-priority task from making progress.
        </p>

        <h3 class="text-lg font-semibold mt-4 text-blue-600">
          🛠 How This Happens
        </h3>
        <ul class="list-disc list-inside ml-4 text-white!">
          <li>A low-priority process starts executing.</li>
          <li>A high-priority process arrives and preempts it.</li>
          <li>
            Before the low-priority process can resume, the high-priority
            process gets scheduled <strong class="text-red-500">again</strong>.
          </li>
          <li>
            This cycle repeats indefinitely, leading to{" "}
            <strong class="text-red-500">livelock</strong>.
          </li>
        </ul>

        <h3 class="text-lg font-semibold mt-4 text-blue-600">
          🎯 Real-World Example
        </h3>
        <p class="text-white!">
          Imagine two people trying to pass through a doorway:
        </p>
        <ul class="list-disc list-inside ml-4 text-white!">
          <li>The first person (low priority) steps forward.</li>
          <li>
            The second person (high priority){" "}
            <strong class="text-red-500">interrupts</strong> and moves forward
            instead.
          </li>
          <li>
            The first person tries again, but the second person{" "}
            <strong class="text-red-500">keeps taking priority</strong>.
          </li>
          <li>This goes on forever, and neither moves forward effectively.</li>
        </ul>

        <h3 class="text-lg font-semibold mt-4 text-blue-600">
          ✅ Possible Solutions
        </h3>
        <ul class="list-disc list-inside ml-4 text-white!">
          <li>
            <strong class="text-green-600">Priority Aging:</strong> Gradually
            increase the priority of waiting tasks.
          </li>
          <li>
            <strong class="text-green-600">Time-Slice Allocation:</strong>{" "}
            Restrict high-priority tasks from running indefinitely.
          </li>
          <li>
            <strong class="text-green-600">Fair Scheduling:</strong> Use
            algorithms like <strong class="text-green-600">Round Robin</strong>{" "}
            to prevent starvation.
          </li>
        </ul>
      </div>
    </div>
  ),
  code: {
    "Main.java": `import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

class SharedMachine {
  private final Lock lock = new ReentrantLock();
  private boolean isT1Turn = true; // Indicates which thread should proceed

  public void useMachine(String threadName) {
      int attempts = 0;

      while (attempts < 10) { // Prevent infinite livelock (exit after retries)
          if (lock.tryLock()) { // Try acquiring the lock
              try {
                  // If it's the other thread's turn, back off
                  if ((threadName.equals("T1") && !isT1Turn) ||
                      (threadName.equals("T2") && isT1Turn)) {
                      System.out.println(threadName + " sees the other thread waiting. Releasing lock...");
                      lock.unlock();
                      try {
                          Thread.sleep(500); // Simulating polite retry
                      } catch (InterruptedException e) {
                          Thread.currentThread().interrupt();
                      }
                      attempts++;
                      continue;
                  }

                  // Process the machine (successful execution)
                  System.out.println(threadName + " is now using the machine! ✅");
                  isT1Turn = !isT1Turn; // Switch turns
                  break; // Exit loop after successful execution

              } finally {
                  lock.unlock();
              }
          } else {
              System.out.println(threadName + " is trying to acquire the machine...");
              try {
                  Thread.sleep(300); // Simulating waiting for lock
              } catch (InterruptedException e) {
                  Thread.currentThread().interrupt();
              }
          }
          attempts++;
      }
      if (attempts == 10) {
          System.out.println(threadName + " has retried too many times. Exiting to prevent livelock.");
      }
  }
}

public class LiveLockExample {
  public static void main(String[] args) {
      SharedMachine machine = new SharedMachine();

      Thread t1 = new Thread(() -> machine.useMachine("T1"));
      Thread t2 = new Thread(() -> machine.useMachine("T2"));

      t1.start();
      t2.start();
  }
}
`,
  },
};

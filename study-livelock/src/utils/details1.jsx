import LivelockSimulation1 from "../../components/simulation1";

export const simulation1_details = {
  title: "Scenario 1: High-Priority Preemption",
  info: "A low-priority process gets constantly preempted by a high-priority process, causing livelock.",
  description: (
    <div>
      <h2 className="text-xl font-bold text-blue-400">
        High-Priority Preemption - Livelock
      </h2>
      <p>
        In this scenario, a low-priority task gets repeatedly{" "}
        <strong>preempted</strong> by a high-priority task. The system keeps
        giving control to the high-priority task, preventing the low-priority
        task from making progress.
      </p>
      <h3 className="text-lg font-semibold mt-4">🛠 How This Happens</h3>
      <ul className="list-disc list-inside ml-4">
        <li>A low-priority process starts executing.</li>
        <li>A high-priority process arrives and preempts it.</li>
        <li>
          Before the low-priority process can resume, the high-priority process
          gets scheduled <strong>again</strong>.
        </li>
        <li>
          This cycle repeats indefinitely, leading to <strong>livelock</strong>.
        </li>
      </ul>
      <h3 className="text-lg font-semibold mt-4">🎯 Real-World Example</h3>
      <p>Imagine two people trying to pass through a doorway:</p>
      <ul className="list-disc list-inside ml-4">
        <li>The first person (low priority) steps forward.</li>
        <li>
          The second person (high priority) <strong>interrupts</strong> and
          moves forward instead.
        </li>
        <li>
          The first person tries again, but the second person{" "}
          <strong>keeps taking priority</strong>.
        </li>
        <li>This goes on forever, and neither moves forward effectively.</li>
      </ul>
      <h3 className="text-lg font-semibold mt-4">✅ Possible Solutions</h3>
      <ul className="list-disc list-inside ml-4">
        <li>
          <strong>Priority Aging:</strong> Gradually increase the priority of
          waiting tasks.
        </li>
        <li>
          <strong>Time-Slice Allocation:</strong> Restrict high-priority tasks
          from running indefinitely.
        </li>
        <li>
          <strong>Fair Scheduling:</strong> Use algorithms like{" "}
          <strong>Round Robin</strong> to prevent starvation.
        </li>
      </ul>
    </div>
  ),
  code: {
    "Task.java": `
import java.util.concurrent.PriorityBlockingQueue;
import java.util.concurrent.atomic.AtomicBoolean;

public class Task implements Runnable, Comparable<Task> {
  private final String name;
  private final int priority;
  private final AtomicBoolean lowPriorityDone;
  private final int executionTime;

  public Task(String name, int priority, AtomicBoolean lowPriorityDone, int executionTime) {
      this.name = name;
      this.priority = priority;
      this.lowPriorityDone = lowPriorityDone;
      this.executionTime = executionTime;
  }

  // Getter for 'name'
  public String getName() {
      return name;
  }

  @Override
  public int compareTo(Task other) {
      return Integer.compare(other.priority, this.priority); // Higher priority first
  }

  @Override
  public void run() {
      if ("High Priority Task".equals(name)) {
          if (!lowPriorityDone.get()) {
              System.out.println(name + " preempting low-priority task! Can't proceed...");
              return;
          }
      }

      System.out.println(name + " is running...");
      try { Thread.sleep(executionTime); } catch (InterruptedException e) { }

      if ("Low Priority Task".equals(name)) {
          lowPriorityDone.set(true);
          System.out.println(name + " has completed!");
      }
  }
}`,
    "Main.java": `
import java.util.concurrent.PriorityBlockingQueue;
import java.util.concurrent.atomic.AtomicBoolean;

public class Main {
  public static void main(String[] args) {
      AtomicBoolean lowPriorityDone = new AtomicBoolean(false);
      PriorityBlockingQueue<Task> scheduler = new PriorityBlockingQueue<>();

      Task lowPriorityTask = new Task("Low Priority Task", 1, lowPriorityDone, 2000);
      Task highPriorityTask = new Task("High Priority Task", 2, lowPriorityDone, 500);

      scheduler.add(lowPriorityTask);
      scheduler.add(highPriorityTask);

      while (true) {
          Task nextTask = scheduler.poll();
          if (nextTask != null) {
              new Thread(nextTask).start();

              // Use the getter instead of direct access
              if (!lowPriorityDone.get() && "High Priority Task".equals(nextTask.getName())) {
                  scheduler.add(nextTask); // Requeue high-priority task
              }
          }

          try { Thread.sleep(300); } catch (InterruptedException e) { }
      }
  }
}`,
  },
};

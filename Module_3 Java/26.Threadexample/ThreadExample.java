
class MessagePrinter implements Runnable {
    private String message;
    public MessagePrinter(String message) {
        this.message = message;
    }


    public void run() {
        for (int i = 1; i <= 5; i++) {
            System.out.println(message + " - " + i);
            try {
                Thread.sleep(500); 
            } catch (InterruptedException e) {
                System.out.println("Thread interrupted");
            }
        }
    }
}


public class ThreadExample {
    public static void main(String[] args) {

        Runnable r1 = new MessagePrinter("Thread 1");
        Runnable r2 = new MessagePrinter("Thread 2");


        Thread t1 = new Thread(r1);
        Thread t2 = new Thread(r2);

        t1.start();
        t2.start();
    }
}

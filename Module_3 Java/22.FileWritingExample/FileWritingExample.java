import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;
public class FileWritingExample {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);
        System.out.print("Enter text to write to the file: ");
        String userText = input.nextLine();
        try {
            FileWriter writer = new FileWriter("output.txt");
            writer.write(userText);
            writer.close();
            System.out.println("Data has been written to output.txt successfully.");
        } catch (IOException e) {
            System.out.println("An error occurred while writing to the file.");
            e.printStackTrace();
        } finally {
            input.close();
        }
    }
}


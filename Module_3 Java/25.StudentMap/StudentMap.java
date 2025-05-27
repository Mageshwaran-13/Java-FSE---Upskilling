import java.util.HashMap;
import java.util.Scanner;

public class StudentMap {
    public static void main(String[] args) {
        HashMap<Integer, String> studentMap = new HashMap<>();
        Scanner input = new Scanner(System.in);

        System.out.print("How many students do you want to add? ");
        int count = input.nextInt();


        for (int i = 1; i <= count; i++) {
            System.out.print("Enter ID for student " + i + ": ");
            int id = input.nextInt();
            input.nextLine(); 

            System.out.print("Enter name for student " + i + ": ");
            String name = input.nextLine();

            studentMap.put(id, name);
        }

        System.out.print("\nEnter a student ID to retrieve name: ");
        int searchId = input.nextInt();

        if (studentMap.containsKey(searchId)) {
            String studentName = studentMap.get(searchId);
            System.out.println("Student with ID " + searchId + ": " + studentName);
        } else {
            System.out.println("No student found with ID: " + searchId);
        }

        input.close();
    }
}

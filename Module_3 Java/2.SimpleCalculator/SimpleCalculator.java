import java.util.Scanner;

public class SimpleCalculator {
    public static void main(String[] args) {
        Scanner input = new Scanner(System.in);

    
        System.out.print("Enter first number: ");
        double num1 = input.nextDouble();

        System.out.print("Enter second number: ");
        double num2 = input.nextDouble();

        System.out.println("Choose an operation:");
        System.out.println("1. Addition");
        System.out.println("2. Subtraction");
        System.out.println("3. Multiplication");
        System.out.println("4. Division");

        System.out.print("Enter your choice (1-4): ");
        int choice = input.nextInt();

        double result;

        switch (choice) {
            case 1:
                result = num1 + num2;
                System.out.println("Sum: " + result);
                break;
            case 2:
                result = num1 - num2;
                System.out.println("Difference: " + result);
                break;
            case 3:
                result = num1 * num2;
                System.out.println("Product: " + result);
                break;
            case 4:
                if (num2 == 0) {
                    System.err.println("Error: Cannot divide by zero.");
                } else {
                    result = num1 / num2;
                    System.out.println("Quotient: " + result);
                }
                break;
            default:
                System.out.println("Invalid choice. Please enter a number between 1 and 4.");
        }

        input.close();
    }
}

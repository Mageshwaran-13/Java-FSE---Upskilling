
class Animal {
    public void makeSound() {
        System.out.println("Animal makes a sound");
    }
}


class Dog extends Animal {
    public void makeSound() {
        System.out.println("Bark");
    }
}

public class Inheritance {
    public static void main(String[] args) {

        Animal anyAnimal = new Animal();
        anyAnimal.makeSound(); 

        Dog dog = new Dog();
        dog.makeSound(); 
    }
}

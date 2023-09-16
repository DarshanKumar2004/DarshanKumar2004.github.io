//Darshan Kumar, C00529580, Honors Contract Java 260, Fall 2023 Semester, TypeRacer Project V1

//GUI & functional Libs
import java.util.*;         // Used for time
import javax.swing.*;       // GUI
import java.awt.*;          // GUI
import java.awt.event.*;    // Event Handling

public class TypeRacerGUI implements ActionListener {
    // Initialization
    // GUI Elements Declaration 
    public static JTextField textBox;               // TextBox
    public static JFrame window;                    // Window
    public static JLabel displayedSentence, WPM;    // Displayed Text
    public static JPanel mainPanel, background;     // Element Containers
    public static JButton resetButton;              // Button
    // Variable declaration
    final static int IndexRange = 10;                   // Update this value if more sentences are added
    public static boolean finishedSentence = false;     // Used for checking if the sentence was typed correctly
    public static boolean alreadyDisplayedWPM = false;  // Used for checking if WPM was only displayed once\
    // Function calls
    public static int index = generateIndex(IndexRange);              // Generate index
    public static int wordCount = numberOfWordsInSentence(index);     // Gets the word count
    public static String chosenSentence = generateSentence(index);    // Gets a sentence
    public static double startTime = currentTime();                   // Gets the "start time"

    public static void main(String[] args) {
        // Launch window
        GUI();

        // Button Press Action Listener 
        resetButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e) {
                textBox.setText("");                             // Clears the textbox to an empty string
                if (alreadyDisplayedWPM)                         // bypasses null pointer if WPM is not displayed
                    WPM.setText("");                             // Clears the WPM
                index = generateIndex(IndexRange);               // Generate index
                wordCount = numberOfWordsInSentence(index);      // Gets the word count
                chosenSentence = generateSentence(index);        // Gets a sentence
                startTime = currentTime();                       // Resets start time
                displayedSentence.setText("Type: " + chosenSentence); // Sets text
                alreadyDisplayedWPM = false;                     // Resets WPM display boolean
                finishedSentence = false;                        // Resets finished sentence boolean so the logic in the textbox can work again
                System.out.println("Button is working");         // For self testing
            }
        });

        // Textbox event handler
        textBox.addActionListener(new java.awt.event.ActionListener() {     // Listening for the Enter key
            public void actionPerformed(ActionEvent event) {                // Exicuted if enter is pressed
                String userTyped = textBox.getText();                       // Stores the typed sentnece from the textbox
                String userPreviouslyTyped = "";                            // Stores users previously typed words
                for (int i = 0; !finishedSentence; i++) {                   // Loop until the sentence is finished
                    if (userTyped.equalsIgnoreCase(chosenSentence)) {       // If user typed = generated sentence
                        // WPM display once
                        if (alreadyDisplayedWPM == false) {                 // To ensure only one display of WPM when enter is pressed
                            // Words per minute
                            double elapsedTime = System.currentTimeMillis() - startTime;    // Elapsed time
                            double elapsedSeconds = elapsedTime / 1000;     // Seconds
                            System.out.println(elapsedSeconds);             // Print sec
                            double elapsedMinutes = elapsedSeconds / 60;    // Minutes
                            System.out.println(elapsedMinutes);             // Print min
                            int wordsPerMinute = (int)(Math.round(wordCount / elapsedMinutes));  // WPM
                            WPM = new JLabel();                             // WPM creation
                            WPM.setText("WPM: " + wordsPerMinute);          // Set text
                            WPM.setForeground(Color.red);                   // WPM color
                            displayLayout(true);                 // Positions the elements
                            // Window
                            mainPanel.add(WPM);                             // Adding WPM lable
                            window.setVisible(true);                        // Setting WPM to visible
                            alreadyDisplayedWPM = true;                     // Allowing only one display/calculation of WPM
                        }
                        finishedSentence = true;
                        System.out.println("The Correct Sentence was Typed");                            
                        break;
                    }
                    // TODO: show green or red based on if the character typed is correct or not
                    // TODO: replace userTyped with event handlers "e"
                    if (userTyped.charAt(i) == chosenSentence.charAt(i)) {          // Correct
                        userPreviouslyTyped = userTyped;            // Updates the previous value of the typed sentence if it is correct
                        System.out.println("Correct letter");
                    }
                    else if (userTyped.charAt(i) != chosenSentence.charAt(i)) {     // Incorrect
                        textBox.setText(userPreviouslyTyped);       // Resets the typed sentence if they are wrong
                        System.out.println("Incorrect letter");
                    }
                    else {
                        System.out.println("Error in character detection");
                        break;
                    }
                }
                System.out.println("User Typed: " + userTyped);
            }
        });
    }   // End of main class

    // Sysetms time
    public static double currentTime() {
        return System.currentTimeMillis();
    }

    // Index RNG
    public static int generateIndex(int range) {
        Random randomNumber = new Random();         // Generates random number
        int index = randomNumber.nextInt(range);    // Picks random number from range
        return index;
    }

    // Fetch Word Count
    public static int numberOfWordsInSentence(int index) {
        ArrayList<Integer> numberOfWords = new ArrayList<Integer>();    // Creates words in sentence array

        // Note: Corilating sentences are found in the generateSentence() function
        numberOfWords.add(10);  // 1st sentence
        numberOfWords.add(9);   // 2nd sentence
        numberOfWords.add(12);  // 3rd sentence
        numberOfWords.add(6);   // 4th sentence
        numberOfWords.add(12);  // 5th sentence
        numberOfWords.add(12);  // 6th sentence
        numberOfWords.add(12);  // 7th sentence
        numberOfWords.add(9);   // 8th sentence
        numberOfWords.add(13);  // 9th sentence
        numberOfWords.add(13);  // 10th sentence
        
        int wordsInSentence = numberOfWords.get(index);     // Uses the same index so the sentene and number match array value wise
        
        return wordsInSentence;
    }

    // Fetch Sentence
    public static String generateSentence(int index) {
        ArrayList<String> listOfSentences = new ArrayList<String>();    // Creates sentence array
        
        // Note: Corilating word counts are found in the numberOfWordsInSentence() function
        listOfSentences.add("They don't know that we know they know we know.");
        listOfSentences.add("There is something about yourself that you don't know.");
        listOfSentences.add("And he told us of his life in the land of submarines.");
        listOfSentences.add("I love to type crazy stuff.");
        listOfSentences.add("I can take you for a ride on my big green tractor.");
        listOfSentences.add("I'm sure there are things you know that you don't even know.");
        listOfSentences.add("Sometimes life is like this tunnel. You can't always see the end.");
        listOfSentences.add("I'm just going to turn through a few things.");
        listOfSentences.add("Mr. Montoya knows the way to the bakery even though he's never been there.");
        listOfSentences.add("He barked orders at his daughters but they just stared back with amusement.");
        
        String sentence = listOfSentences.get(index);       // Creates a sentence

        return sentence;
    }

    // GUI
    public static void GUI() {
        // Window initialization
        window = new JFrame("Type Racer");                      // New window & title while "invisible"
        window.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);  // Default operations
        window.setLayout(new FlowLayout());                     // Set flow layout
        // Lables
        displayedSentence = new JLabel();                                   // Generated lable
        displayedSentence.setText("Type: " + chosenSentence);               // Sets text
        displayedSentence.setForeground(Color.red);                         // Sentence color
        displayedSentence.setFont(new Font("SansSerif", Font.PLAIN, 20));   // Font size & Font
        // Text box
        textBox = new JTextField(60);                               // New textbox
        textBox.setPreferredSize(new Dimension(200, 30));           // Textbox size
        // Reset button
        resetButton = new JButton("Game Reset");                    // New button
        resetButton.setFont(new Font("SansSerif", Font.PLAIN, 14)); // Font size & Font
        resetButton.setPreferredSize(new Dimension(120, 25));       // Button size
        // Main UI panel
        mainPanel = new JPanel();               // New panel
        mainPanel.setPreferredSize(new Dimension(800, 200));    // Size of panel
        mainPanel.setBackground(Color.DARK_GRAY);               // Creates background color
        mainPanel.add(resetButton);                             // Adding a reset button to the window
        mainPanel.add(displayedSentence);                       // Adding text to the window
        mainPanel.add(textBox);                                 // Adding text box to the window
        displayLayout(false);                        // Positions the elements
        // Window
        window.setBackground(Color.red);                        // Sets text color
        window.add(mainPanel, BorderLayout.SOUTH);              // Adding pannel to frame
        window.setTitle("Type Racer");                          // Set window title while "visible"
        window.setExtendedState(JFrame.MAXIMIZED_BOTH);         // Size of window
        window.setVisible(true);                                // Launches the visible window
        // Background
        Container backgrounds = window.getContentPane();        // Grabs the panel of the window
        backgrounds.setBackground(new Color(0,47,15));          // Sest the color of the window panel
    }

    // Element screen positions
    public static void displayLayout(boolean displayWPM) {
        SpringLayout layout = new SpringLayout();
        mainPanel.setLayout(layout);
        // WPM
        if (displayWPM) {
            layout.putConstraint(SpringLayout.WEST, WPM,    // WPM Alignment
            15, // Left & Right alignment
            SpringLayout.WEST, mainPanel);
            layout.putConstraint(SpringLayout.NORTH, WPM,   // WPM Alignment
            80, // Up & Down alignment
            SpringLayout.NORTH, mainPanel);
        }
        // Textbox
        layout.putConstraint(SpringLayout.WEST, textBox,    // Textbox Alignment
        70, // Left & Right alignment
        SpringLayout.WEST, mainPanel);
        layout.putConstraint(SpringLayout.NORTH, textBox,   // Textbox Alignment
        150, // Up & Down alignment
        SpringLayout.NORTH, mainPanel);
        // Sentence
        layout.putConstraint(SpringLayout.WEST, displayedSentence,  // Sentence Alignment
        15, // Left & Right alignment
        SpringLayout.WEST, mainPanel);
        layout.putConstraint(SpringLayout.NORTH, displayedSentence, // Sentence Alignment
        100, // Up & Down alignment
        SpringLayout.NORTH, mainPanel);
        // Button
        layout.putConstraint(SpringLayout.WEST, resetButton,  // Button Alignment
        340, // Left & Right alignment
        SpringLayout.WEST, mainPanel);
        layout.putConstraint(SpringLayout.NORTH, resetButton, // Button Alignment
        40, // Up & Down alignment
        SpringLayout.NORTH, mainPanel);
    }

    // TODO: find the correct key event handler
    // Enter key
    @Override
    public void actionPerformed(ActionEvent e) {
        // Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'actionPerformed'");
    }
}
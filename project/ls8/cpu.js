/**
 * LS-8 v2.0 emulator skeleton code
 */

/**
 * Class for simulating a simple Computer (CPU & memory)
 */

 const LDI = 0b10011001;
 const PRN = 0b01000011;
 const HLT = 0b00000001;
 const MUL = 0b10101010;
 const PUSH = 0b01001101;
 const POP = 0b01001100;

 // Step 8 progress
    //  const branchTable = [];

    //  function LDI_Handler(regA, regB) {
    //     this.reg[regA] = regB;
    //  }
    //  function PRN_Handler(regA) {
    //     console.log(this.reg[regA]);
    //  }
    //  function HLT_Handler() {
    //     this.stopClock();
    //  }
    //  function MULT_Handler(regA, regB) {
    //     this.reg[regA] = this.reg[regA] * this.reg[regB]
    //  }

    //  branchTable['LDI'] = LDI_Handler
    //  branchTable['PRN'] = PRN_Handler
    //  branchTable['HLT'] = HLT_Handler
    //  branchTable['MULT'] = MULT_Handler
    //  console.log(branchTable)

class CPU {

    /**
     * Initialize the CPU
     */
    constructor(ram) {
        this.ram = ram;

        this.reg = new Array(8).fill(0); // General-purpose registers R0-R7
        
        // Special-purpose registers
        this.PC = 0; // Program Counter
        this.SP = 244; // 7 = R7, SP = stack pointer
        this.reg[7] = this.SP; // 244 = F4
    }
    
    /**
     * Store value in memory address, useful for program loading
     */
    poke(address, value) {
        this.ram.write(address, value);
    }

    /**
     * Starts the clock ticking on the CPU
     */
    startClock() {
        this.clock = setInterval(() => {
            this.tick();
        }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
    }

    /**
     * Stops the clock
     */
    stopClock() {
        clearInterval(this.clock);
    }

    /**
     * ALU functionality
     *
     * The ALU is responsible for math and comparisons.
     *
     * If you have an instruction that does math, i.e. MUL, the CPU would hand
     * it off to it's internal ALU component to do the actual work.
     *
     * op can be: ADD SUB MUL DIV INC DEC CMP
     */
    alu(op, regA, regB) {
        switch (op) {
            case MUL:
                this.reg[regA] = this.reg[regA] * this.reg[regB]
                this.PC += 3;
                break;
            case LDI:
                this.reg[regA] = regB;
                this.PC += 3;
                break;
            case PRN:
                console.log(this.reg[regA]);
                this.PC += 2;
                break;
            case HLT:
                this.stopClock();
                break;
            case PUSH:
                this.ram.write(this.reg[7] - 1, this.reg[regA])
                this.PC += 2;
                this.reg[7] -= 1;
                break;
            case POP:
                this.reg[regA] = this.ram.read(this.reg[7]);
                this.PC += 2;
                this.reg[7] += 1;
                break;
            default:
                this.stopClock();
                break;
        }
    }

    /**
     * Advances the CPU one cycle
     */
    tick() {
        // Load the instruction register (IR--can just be a local variable here)
        // from the memory address pointed to by the PC. (I.e. the PC holds the
        // index into memory of the instruction that's about to be executed
        // right now.)

        // !!! IMPLEMENT ME
        const IR = this.ram.read(this.PC);
        
        // Debugging output
        // console.log(`${this.PC}: ${IR.toString(2)}`);
        
        // Get the two bytes in memory _after_ the PC in case the instruction
        // needs them.
        
        // !!! IMPLEMENT ME
        const operandA = this.ram.read(this.PC + 1);
        const operandB = this.ram.read(this.PC + 2);
        
        // Execute the instruction. Perform the actions for the instruction as
        // outlined in the LS-8 spec.
        
        // Step 2-5, switch case in tick
            // switch(IR) {
            //     case LDI: 
            //         this.reg[operandA] = operandB;
            //         this.PC += 3;
            //         break;
            //     case PRN: 
            //         console.log(this.reg[operandA]);
            //         this.PC += 2;
            //         break;
            //     case HLT: 
            //         this.stopClock();
            //         break;
            //     default:
            //         this.stopClock();
            //         return;
            // }

        // Multiply - Step 6
        this.alu(IR, operandA, operandB)
        // branchTable[IR](operandA, operandB)
        
        // Increment the PC register to go to the next instruction. Instructions
        // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
        // instruction byte tells you how many bytes follow the instruction byte
        // for any particular instruction.
        
        // !!! IMPLEMENT ME
        // const instLen = (IR >> 6) + 1;
        // this.PC += instLen;
    }
}

module.exports = CPU;

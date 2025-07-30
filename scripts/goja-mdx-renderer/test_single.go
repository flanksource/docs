package main

import (
	"fmt"
	"os"
)

func main() {
	renderer, err := NewMDXRenderer()
	if err \!= nil {
		fmt.Printf("Error: %v
", err)
		return
	}
	
	testInput := `<Fields connection="aws"/>`
	result, err := renderer.ProcessMDX(testInput)
	if err \!= nil {
		fmt.Printf("Process error: %v
", err)
		return
	}
	fmt.Printf("Result: %s
", result)
}

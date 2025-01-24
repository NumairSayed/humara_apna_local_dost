return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full h-full max-w-6xl bg-gray-800/90 border-none shadow-none overflow-hidden">
        <CardBody className="h-full flex flex-col justify-center items-center p-2 sm:p-4">
          {stream ? (
            <div className={`w-full h-full flex flex-col ${isMaximized ? "" : "sm:flex-row"} gap-2 sm:gap-4`}>
              {/* ... (previous video and avatar section remains the same) */}
              
              {!isMaximized && (
                <div className="w-full sm:w-1/3 h-64 sm:h-full bg-gray-700/50 rounded-lg overflow-hidden flex flex-col">
                  <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
                    {messages.map((message, index) => (
                      <div key={index} className={`mb-4 ${message.role === "user" ? "text-right" : "text-left"}`}>
                        <div
                          className={`inline-block p-3 rounded-lg ${
                            message.role === "user" ? "bg-blue-600 text-white" : "bg-gray-600 text-blue-100"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                  
                  {/* Text Input Section */}
                  <div className="p-4 border-t border-gray-600 flex items-center space-x-2">
                    <Input
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type a message..."
                      disabled={isTextInputDisabled || isAvatarTalking}
                      className="flex-grow"
                      variant="bordered"
                    />
                    <Button
                      isIconOnly
                      color="primary"
                      variant="shadow"
                      onClick={handleTextSubmit}
                      disabled={!textInput.trim() || isTextInputDisabled || isAvatarTalking}
                      className="rounded-full"
                    >
                      <Send size={20} />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // ... (previous initialization section remains the same)
          )}
        </CardBody>
      </Card>
      {/* ... (previous debug section remains the same) */}
    </div>
  )
}

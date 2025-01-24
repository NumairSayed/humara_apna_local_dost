return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full h-full max-w-6xl bg-gray-800/90 border-none shadow-none overflow-hidden">
        <CardBody className="h-full flex flex-col justify-center items-center p-2 sm:p-4">
          {stream ? (
            <div className={`w-full h-full flex flex-col ${isMaximized ? "" : "sm:flex-row"} gap-2 sm:gap-4`}>
              <div
                className={`relative ${isMaximized ? "w-full h-full" : "w-full sm:w-2/3 h-full"} bg-black rounded-lg overflow-hidden`}
              >
                <video ref={mediaStream} autoPlay playsInline className="w-full h-full object-cover">
                  <track kind="captions" />
                </video>
                <div className="absolute top-2 right-2 z-10">
                  <Button
                    size="sm"
                    variant="flat"
                    color="primary"
                    isIconOnly
                    onClick={toggleMaximize}
                    className="bg-gray-800/50 hover:bg-gray-700/50"
                  >
                    {isMaximized ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                  </Button>
                </div>
                <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center z-10">
                  <div className="bg-gray-900/80 text-blue-300 px-4 py-2 rounded-full text-sm">
                    {isAvatarTalking ? "Avatar is talking..." : isRecording ? "Recording..." : "Ready"}
                  </div>
                  <Button
                    size="sm"
                    color={isRecording ? "danger" : "primary"}
                    variant="shadow"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                    onMouseDown={startRecording}
                    onMouseUp={stopRecording}
                    className="rounded-full text-xs sm:text-sm"
                  >
                    <Mic size={16} className="mr-1 sm:mr-2" />
                    {isRecording ? "Recording..." : "Hold to Record"}
                  </Button>
                </div>
                <Button
                  className="absolute top-2 left-2 bg-red-600 hover:bg-red-700 text-white rounded-full text-xs sm:text-sm py-1 px-2 sm:py-2 sm:px-4 transition-all duration-300 ease-in-out transform hover:scale-105"
                  size="sm"
                  variant="shadow"
                  onClick={endSession}
                >
                  End Session
                </Button>
              </div>
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
                </div>
              )}
            </div>
          ) : !isLoadingSession ? (
            <div className="w-full max-w-xs sm:max-w-md space-y-4 sm:space-y-6">
              <h2 className="text-3xl font-bold text-blue-300 text-center">Interactive AI Avatar</h2>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="knowledgeId" className="text-sm font-medium text-blue-300">
                    Custom Knowledge ID (optional)
                  </label>
                  <input
                    id="knowledgeId"
                    className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 border border-blue-500 text-blue-100 placeholder-blue-300/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter a custom knowledge ID"
                    value={knowledgeId}
                    onChange={(e) => setKnowledgeId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="avatarId" className="text-sm font-medium text-blue-300">
                    Custom Avatar ID (optional)
                  </label>
                  <input
                    id="avatarId"
                    className="w-full p-2 sm:p-3 rounded-lg bg-gray-700 border border-blue-500 text-blue-100 placeholder-blue-300/50 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm sm:text-base"
                    placeholder="Enter a custom avatar ID"
                    value={avatarId}
                    onChange={(e) => setAvatarId(e.target.value)}
                  />
                </div>
                <Select
                  label="Select an avatar"
                  placeholder="Choose from example avatars"
                  className="w-full text-sm sm:text-base"
                  onChange={(e) => {
                    setAvatarId(e.target.value)
                  }}
                >
                  {AVATARS.map((avatar) => (
                    <SelectItem key={avatar.avatar_id} textValue={avatar.avatar_id}>
                      {avatar.name}
                    </SelectItem>
                  ))}
                </Select>
                <Select
                  label="Select language"
                  placeholder="Choose a language"
                  className="w-full text-sm sm:text-base"
                  selectedKeys={[language]}
                  onChange={(e) => {
                    setLanguage(e.target.value)
                  }}
                >
                  {STT_LANGUAGE_LIST.map((lang) => (
                    <SelectItem key={lang.key}>{lang.label}</SelectItem>
                  ))}
                </Select>
              </div>
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-base sm:text-lg font-semibold py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105"
                size="lg"
                onClick={startSession}
              >
                Start Interactive Session
              </Button>
              <p className="text-blue-200 text-sm text-center">
                Press and hold spacebar to record once the session starts
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2 sm:space-y-4">
              <Spinner color="primary" size="lg" />
              <p className="text-blue-300 text-base sm:text-lg">Initializing AI Avatar...</p>
            </div>
          )}
        </CardBody>
      </Card>
      {debug && (
        <div className="fixed bottom-2 right-2 sm:bottom-4 sm:right-4 max-w-[calc(100%-1rem)] sm:max-w-xs bg-gray-800/90 border border-blue-500 rounded-lg p-2 sm:p-4 shadow-lg z-50">
          <p className="font-mono text-xs text-blue-300 break-words">
            <span className="font-bold text-blue-400">Console:</span>
            <br />
            {debug}
          </p>
        </div>
      )}
      <style jsx>{`
        @media (max-width: 640px) {
          input, select, button {
            font-size: 16px; /* Prevents zoom on focus in iOS */
          }
        }

        @media (max-height: 600px) and (orientation: landscape) {
          .min-h-screen {
            min-height: 100vh;
          }
        }
      `}</style>
    </div>
  )
}

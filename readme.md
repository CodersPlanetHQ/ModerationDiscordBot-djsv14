# ModerationDiscordBot-djsv14

A simple moderation bot for Discord using discord.js v14 and slash commands. This bot is designed to be a starting point for learning Discord bot development, with all core logic contained in a single file (`index.js`).

**Disclaimer:** This is a basic example and lacks many features and best practices of a production-ready bot (e.g., extensive error handling, logging, configuration management, command handler separation, database integration for warnings/cases). It is intended for educational purposes.

## Features

*   `/ping`: Basic command to check bot responsiveness.
*   `/ban <user> [reason]`: Bans a user from the server.
*   `/kick <user> [reason]`: Kicks a user from the server.
*   `/timeout <user> <duration_in_minutes> [reason]`: Times out a user for a specified duration.

## Prerequisites

*   Node.js (v16.9 or higher recommended)
*   A Discord Bot Token (Create an application and bot user in the Discord Developer Portal)
*   Basic knowledge of JavaScript

## Setup

1.  **Clone the repository (or copy `index.js`):**
    ```bash
    git clone https://github.com/CodersPlanetHQ/ModerationDiscordBot-djsv14.git
    cd ModerationDiscordBot-djsv14
    ```
2.  **Install dependencies:**
    ```bash
    npm install discord.js dotenv @discordjs/rest discord-api-types
    ```
3.  **Create a `.env` file:**
    Create a file named `.env` in the root directory of the project and add your bot token and client ID:
    ```env
    DISCORD_TOKEN=YOUR_BOT_TOKEN_HERE
    CLIENT_ID=YOUR_CLIENT_ID_HERE
    # Optional: Set your development guild ID for faster command updates
    # GUILD_ID=YOUR_GUILD_ID_HERE
    ```
    Replace `YOUR_BOT_TOKEN_HERE` and `YOUR_CLIENT_ID_HERE` with your actual bot token and client ID. If you set `GUILD_ID`, replace `YOUR_GUILD_ID_HERE` with your server's ID where you want to test commands quickly.
4.  **Invite the bot to your server:**
    Go to the Discord Developer Portal, navigate to your bot application, go to "OAuth2" -> "URL Generator". Select `bot` and `applications.commands` for SCOPES. For BOT PERMISSIONS, select `Administrator` (for simplicity in this example, though less permissions is better in production). Copy the generated URL and paste it into your browser to invite the bot to your server.

## Running the Bot

```bash
node index.js
```

The bot should log in and register slash commands. Slash commands might take up to an hour to appear globally, but will update instantly in the guild specified by `GUILD_ID` in your `.env` file.

## Contributing

Feel free to fork this repository and make improvements.

## Roadmap
Roadmap: Enhancing the Mod Bot

-   **Core Functionality Expansion**
    -   Add more moderation commands
        -   `warn`: Implement a warning system (requires data storage)
        -   `unban`: Allow unbanning users by ID
        -   `mute`/`unmute`: Implement mute functionality (using roles or timeouts)
        -   `purge`: Delete a number of messages
        -   `lock`/`unlock`: Lock/unlock channels
    -   Improve existing commands
        -   Add confirmation steps for irreversible actions (ban/kick)
        -   Better error handling and user feedback
        -   More specific permission checks
-   **Code Structure & Maintainability**
    -   Split into multiple files / Use a Command Handler
        -   Separate command definitions and execution logic
        -   Separate event listeners
        -   Centralize bot initialization
    -   Implement a Configuration System
        -   Use a dedicated config file (JSON, YAML) or database for settings
        -   Allow per-guild settings
-   **Data Storage (Essential for advanced features)**
    -   Integrate a Database
        -   Store moderation logs (who, what, when, why)
        -   Store warnings
        -   Store timed mutes/bans
        -   Options: SQLite (simple, file-based), MongoDB, PostgreSQL
-   **Logging & Auditing**
    -   Implement server-specific logging channels
    -   Log all moderation actions performed by the bot
-   **Advanced Features**
    -   Automated moderation (spam detection, link filtering, profanity filtering)
    -   Case management system (view historical moderation actions for a user)
    -   Appeal system integration
    -   Web dashboard for managing moderation data
-   **Deployment & Scaling**
    -   Learn proper deployment strategies (Heroku, VPS, VPS, Docker)
    -   Consider sharding for larger bots
-   **Testing**
    -   Write unit tests for command logic
    -   Write integration tests for bot interactions

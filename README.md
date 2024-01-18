# Description

I created a stopwatch that supports functionality start stop reset and lap. The key functionality is straightforward, but I fortunately caught an edge case last minute where you could lap even thought the timer isn't running or if the time passed is 0.

# Changes Made

Filled out App.tsx with styling and main stopwatch component.

Filled out Stopwatch.tsx with all functionality and logic for rendering stopwatch component and math involved.

Filled StopwatchButton with the styled buttons with logic passed down as callback functions for best practices like reusability and give control to parent component. Just in case we need to involve more child components we lift state up as best practice.

<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\NewUserCreated;
use App\Mail\SendMail;
use Illuminate\Support\Facades\Mail;

class SendEmailVerification implements ShouldQueue
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(NewUserCreated $event): void
    {
        sleep(5); //sends the mail below after 5 seconds of sleep
        Mail::to($event->user->email)->send(mailable: new SendMail($event->user));
    }
}

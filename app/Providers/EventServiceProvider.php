<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Octopy\Impersonate\Events\BeginImpersonation;
use Octopy\Impersonate\Events\LeaveImpersonation;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event to listener mappings for the application.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     */
    public function boot(): void
    {
        // Build out the impersonation event listeners - Otherwise we get a redirect to login if not setting the password_hash_sanctum when using sanctum.
        Event::listen(function (BeginImpersonation $event) {
            session()->put([
                'password_hash_sanctum' => $event->impersonated->getAuthPassword(),
            ]);
        });

        Event::listen(function (LeaveImpersonation $event) {
            session()->remove('password_hash_web');
            session()->put([
                'password_hash_sanctum' => $event->impersonator->getAuthPassword(),
            ]);
            Auth::setUser($event->impersonator);
        });
    }

    /**
     * Determine if events and listeners should be automatically discovered.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}

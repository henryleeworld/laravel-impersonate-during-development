<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->withPersonalTeam()->create([
            'name' => __('Administrator'),
            'email' => 'admin@admin.com',
        ]);
        User::factory()->times(10)->withPersonalTeam()->create();
    }
}

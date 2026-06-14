<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Nota;
use App\Models\User;

class NotaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Nota $nota): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'petugas_ram';
    }

    public function update(User $user): bool
    {
        return $user->role === 'petugas_ram';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Nota $nota): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Nota $nota): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Nota $nota): bool
    {
        return false;
    }
}

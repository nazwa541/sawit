<?php

namespace App\Policies;

use Illuminate\Auth\Access\Response;
use App\Models\Pengiriman;
use App\Models\User;

class PengirimanPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    public function create(User $user): bool
    {
        return $user->role === 'pekerja';
    }

    public function update(User $user, Pengiriman $pengiriman): bool
    {
        return
            $user->role === 'pekerja'
            && $pengiriman->pekerja_id === $user->id;
    }

    public function delete(User $user, Pengiriman $pengiriman): bool
    {
        return
            $user->role === 'pekerja'
            && $pengiriman->status === 'perjalanan';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Pengiriman $pengiriman): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Pengiriman $pengiriman): bool
    {
        return false;
    }
}
